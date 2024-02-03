import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import MyPageButton from '../components/Profile/MyPageButton';
import NoImage from 'assets/profile.jpg';
import {
    Typography,
    Box,
    Container,
    Chip,
    Button,
} from '@mui/material';
import TagsInput from "../components/Profile/Update/TagsInput";
import ProfileImageUploader from "../components/Profile/Update/ProfileImageUploader";
import DrinkingAmountInput from "../components/Profile/Update/DrinkingAmountInput";
import IntroductionInput from "../components/Profile/Update/IntroductionInput";

const UpdateMyPage = () => {
    const {userId} = useParams();
    const imageInputRef = useRef(null);


    // state
    const [profileData, setProfileData] = useState({
        nickname: '',
        birthRange: 0,
        gender: '',
        profile: '',
        introduction: '',
        alcoholLimitBottle: 0,
        alcoholLimitGlass: 0,
        tags: [],
    });
    const [imagePreview, setImagePreview] = useState(NoImage);
    const [sojuBottleCount, setSojuBottleCount] = useState(0);
    const [sojuCupCount, setSojuCupCount] = useState(0);
    const [introduction, setIntroduction] = useState('');
    const [tagOptions, setTagOptions] = useState([
        "1~2명", "3~5명", "6~8명", "8~10명",
        "20대", "30대", "40대", "50대", "60대 이상",
        "직장인", "학생", "취준생", "주부", "홈 프로텍터",
        "남자만", "여자만", "남녀 모두",
    ]);

    const [selectedTags, setSelectedTags] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [addTag, setAddTag] = useState('');
    const [error, setError] = useState('');

    // selectedImageFile 상태를 관리하기 위한 useState
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    // user 프로필 정보를 가져오는 함수
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/profile/${userId}`);
                const data = response.data;

                setProfileData({
                    nickname: data.nickname || '',
                    birthRange: data.birthRange || 0,
                    gender: data.gender || '',
                    profile: data.profile || NoImage,
                    introduction: data.introduction || '',
                    alcoholLimitBottle: data.alcoholLimitBottle || 0,
                    alcoholLimitGlass: data.alcoholLimitGlass || 0,
                    tags: data.tags || [],
                });

                // setProfileData 이후에 상태 업데이트 수행
                setSojuBottleCount(data.alcoholLimitBottle || 0);
                setSojuCupCount(data.alcoholLimitGlass || 0);
                setIntroduction(data.introduction || '');
                setSelectedTags(data.tags || []);
                setImagePreview(data.profile || NoImage);
            } catch (error) {
                console.log('프로필 데이터를 가져오는 중 에러 발생: ', error);
            }
        };

        getProfileData();
    }, [userId]);


    // 프로필 이미지 변경 함수
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


    // 프로필 기본 이미지로 초기화하는 함수
    const handleCancelImage = () => {
        setImagePreview(NoImage);
    };

    // 태그 선택 함수
    const handleTagClick = (clickTag) => {
        if (selectedTags.includes(clickTag)) {
            setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== clickTag));
        } else {
            setSelectedTags((prevTags) => [...prevTags, clickTag]);
        }
    };


    // 태그 추가 버튼 클릭 함수 (클릭할 때마다 폼 표시 여부 토글)
    const handleAddButton = () => {
        setIsVisible(!isVisible);
    };

    const addTagOptions = () => {
        if (addTag.trim() !== '' && addTag.length <= 10) {
            if (!tagOptions.includes(addTag)) {
                const updatedTags = [...tagOptions, addTag];

                // 선택된 태그 업데이트
                setSelectedTags([...selectedTags, addTag]);

                // 상태 업데이트
                setTagOptions(updatedTags);
                setAddTag('');
                setError('');
            } else {
                setError('이미 존재하는 태그입니다.');
            }
        } else {
            setError('태그는 1자 이상 10자 이하로 작성해주세요.');
        }
    };

    const SaveProfileImage = async () => {
        try {
            console.log("Selected Image File:", selectedImageFile);
            // 이미지 파일이 선택되지 않았을 경우 예외처리
            if (!selectedImageFile) {
                console.error("이미지 파일이 선택되지 않았습니다.");
                return;
            }
            // FormData 객체를 생성하여 이미지 파일을 담음
            const formData = new FormData();
            formData.append("file", selectedImageFile);

            // Axios를 사용하여 이미지를 업로드하는 요청 보냄
            const response = await axios.put(`http://localhost:8080/profile/${userId}/uploadProfileImage`, formData);

            // 응답에 따른 처리 (여기서는 콘솔에 출력)
            console.log(response.data);
        } catch (error) {
            console.error("프로필 이미지 업로드에 실패했습니다.", error);
        }
    };
    // saveProfile 함수 수정
    const saveProfile = async () => {
        try {
            // 서버에 요청 보내기
            const response = await axios.put(
                `http://localhost:8080/profile/${userId}/modify`,
                {
                    nickname: profileData.nickname,
                    birthRange: profileData.birthRange,
                    gender: profileData.gender,
                    introduction: introduction,
                    alcoholLimitBottle: sojuBottleCount,
                    alcoholLimitGlass: sojuCupCount,
                    tags: selectedTags,
                });

            console.log('프로필 저장 성공:', response.data);
        } catch (error) {
            console.log('프로필 저장 중 에러 발생:', error);
        }
    };

    // 저장 버튼 클릭 시 SaveProfileImage 함수와 saveProfile 함수를 호출
    const handleSaveButtonClick = async () => {
        await SaveProfileImage(); // SaveProfileImage 함수의 완료를 기다림
        saveProfile(); // SaveProfileImage가 완료된 후 saveProfile 함수 실행
    };




    console.log(`nickname: ${profileData.nickname}`)
    console.log(`birthRange: ${profileData.birthRange}`)
    console.log(`gender: ${profileData.gender}`)
    console.log(`introduction: ${introduction}`)
    console.log(`sojuBottleCount: ${sojuBottleCount}`)
    console.log(`sojuCupCount: ${sojuCupCount}`)
    console.log(`selectedTags: ${selectedTags}`)
    console.log(`imagePreview: ${imagePreview}`)

    return (
        <Container component="form">
            <MyPageButton/>
            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                }}
            >
                <>
                    <Box
                        m={3}
                        sx={{
                            width: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ProfileImageUploader
                            userId={userId}
                            imagePreview={imagePreview}
                            handleImageChange={handleImageChange}
                            handleCancelImage={handleCancelImage}
                            selectedImageFile={selectedImageFile}
                            saveProfileImage={SaveProfileImage}
                        />
                        <Box
                            m={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{fontWeight: 'bold'}} variant="h5">
                                {profileData.nickname}
                            </Typography>
                            <div style={{display: 'flex', marginTop: '10px', gap: 10}}>
                                <Chip label={`${profileData.birthRange}대`} variant="Filled"
                                      sx={{backgroundColor: '#CDFAD5'}}/>
                                <Chip label={profileData.gender} variant="Filled" sx={{backgroundColor: '#FF9B9B'}}/>
                            </div>
                        </Box>
                    </Box>
                </>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>

                    <DrinkingAmountInput
                        sojuBottleCount={sojuBottleCount}
                        sojuCupCount={sojuCupCount}
                        setSojuBottleCount={setSojuBottleCount}
                        setSojuCupCount={setSojuCupCount}
                    />


                    <IntroductionInput
                        introduction={introduction}
                        setIntroduction={setIntroduction}
                    />

                    <TagsInput
                        tagOptions={tagOptions}
                        selectedTags={selectedTags}
                        handleTagClick={handleTagClick}
                        isVisible={isVisible}
                        toggleVisibility={handleAddButton}
                        addTagOptions={addTagOptions}
                        addTag={addTag}
                        setAddTag={setAddTag}
                        error={error}
                    />
                </Box>
            </Box>
            <Button
                fullWidth
                sx={{
                    marginTop: 2,
                    backgroundColor: '#ff9b9b',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    padding: '15px',
                    '&:hover': {
                        backgroundColor: '#ff7f7f',
                    },
                }}
                onClick={handleSaveButtonClick}
            >
                프로필 저장하기
            </Button>
        </Container>
    );
};

export default UpdateMyPage;
