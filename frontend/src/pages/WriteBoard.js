import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NoImage from 'assets/no_img.png';
import CustomTextareaAutosize from 'components/CustomTextareaAutosize';
import AddIngredient from "components/WriteBoard/AddIngredient";
import Ingredients from "components/WriteBoard/Ingredients";
import {Button, TextField, Typography, Box, TextareaAutosize, IconButton, Grid, Container} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {array} from "yup";

function BulletinBoard() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(NoImage);
    const nickname = useSelector(state => state.auth.user?.nickname);
    const [cocktails, setCocktails] = useState([]);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imgUrl, setImgUrl] = useState('')

    // 전부 입력되었는지 확인하기 위한 변수
    const isFormValid = title && content && cocktails.length > 0 && selectedImageFile;

    // 인증 헤더를 가져오는 함수
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? {Authorization: authHeader} : {};
    };

    // 컴포넌트 마운트 시 사용자 ID 가져오기
    useEffect(() => {
        getAuthHeader();
    }, []);


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // 이미지 파일인지 확인
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드할 수 있습니다.');
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            // 이미지 파일을 상태로 업데이트
            setSelectedImageFile(file);
        }
    };

    const handleCancelImage = () => {
        setImagePreview(NoImage);
    };

    const saveRecipeImage = async (e) => {
        e.preventDefault()
        try {
            // 이미지 파일이 선택되지 않았을 경우 예외처리
            if (!selectedImageFile) {
                console.error("이미지 파일이 선택되지 않았습니다.");
                return;
            }

            // FormData 객체를 생성하여 이미지 파일을 담음
            const formData = new FormData();
            formData.append("file", selectedImageFile);

            // Axios를 사용하여 이미지를 업로드하는 요청 보냄
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/uploadBoardImage`, formData,
                {headers: getAuthHeader(),});

            // 이미지 업로드 완료 후 URL을 반환
            return response.data.imageUrl;

        } catch (error) {
            console.error("이미지 업로드에 실패했습니다.", error);
            throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
        }
    };

    // 게시글 저장 함수, 이제 imageUrl을 인자로 받음
    const saveRecipe = async (imageUrl) => {
        console.log("saveRecipe");
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/write`, {
                nickname: nickname,
                title: title,
                content: content,
                cocktails: cocktails,
                image: imageUrl // 인자로 받은 이미지 URL 사용
            }, {headers: getAuthHeader()});

            console.log('게시글 작성 완료: ', response.data);
        } catch (error) {
            console.error('게시글 작성 중 오류 발생: ', error);
            throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
        }
    };

    // 이미지 업로드 및 게시글 저장을 담당하는 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        // 폼 유효성 검사 추가
        if (!isFormValid) {
            alert('모든 필드를 채워주세요.');
            return;
        }
        try {
            const imageUrl = await saveRecipeImage(e); // 이미지 업로드 완료까지 기다림
            await saveRecipe(imageUrl); // 업로드된 이미지 URL을 가지고 게시글 저장
            alert('레시피가 성공적으로 저장되었습니다😊');

            // 입력 필드와 이미지 미리보기를 초기화
            setTitle(''); // 제목 초기화
            setContent(''); // 내용 초기화
            setCocktails([]); // 재료 목록 초기화
            setImagePreview(NoImage); // 이미지 미리보기 초기화
            setSelectedImageFile(null); // 선택된 이미지 파일 초기화
        } catch (error) {
            console.error('게시글 작성 중 오류 발생: ', error);
        }
    };


    return (
        <Container>
            <Box component="form" noValidate autoComplete="off" mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '300px',
                                mb: 1,
                            }}>
                                <img src={imagePreview} alt="Preview" style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    border: '1px solid grey',
                                }}/>
                                {imagePreview !== NoImage && (
                                    <IconButton
                                        aria-label="delete"
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            bottom: 0,
                                            color: 'grey[900]',
                                            backgroundColor: 'lightgrey',
                                            borderRadius: '4px',
                                            margin: '0 4px 4px 0',
                                        }}
                                        onClick={handleCancelImage}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                )}
                                <Button variant="contained" component="label" fullWidth>
                                    이미지 업로드
                                    <input type="file" hidden onChange={handleImageChange}
                                           accept="image/*"/>
                                </Button>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField label="제목" variant="outlined" fullWidth value={title}
                                   onChange={handleTitleChange} sx={{mb: 2}}/>

                        <CustomTextareaAutosize
                            minRows={12}
                            placeholder="내용"
                            value={content}
                            onChange={handleContentChange}
                        />
                        <Ingredients cocktails={cocktails}/>
                        <AddIngredient updateCocktails={setCocktails}/> {/* prop으로 상태 업데이트 함수 전달 */}

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}
                                    disabled={!isFormValid}>
                                레시피 올리기
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default BulletinBoard;
