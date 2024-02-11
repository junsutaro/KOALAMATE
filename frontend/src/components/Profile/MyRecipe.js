import React, {useState, useEffect} from 'react';
import {Typography, Box, Container, Button} from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeList from '../RecipeBoard/RecipeList';
import style from '../RecipeBoard/RecipeList.module.css';
import RecipeItem from '../RecipeBoard/RecipeItem';
import axios from "axios";

const MyRecipe = ({nickname, userId}) => {

    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 초기화

    // 인증 헤더를 가져오는 함수
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? {Authorization: authHeader} : {};
    };

    const pageNum = 1
    const sizeNum = 3;
    const [recipeData, setRecipeData] = useState([])

    const getRecipeData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/posts?page=${pageNum}&size=${sizeNum}`,
                {
                    headers: getAuthHeader(), // 인증 헤더 추가
                })
            const data = response.data.content

            // 배열 데이터를 받아온 그대로 상태에 설정
            setRecipeData(data.map(item => ({
                boardId: item.id,                       // 레시피 id
                title: item.title,                      // 레시피 이름
                content: item.content,                  // 레시피 내용
                date: item.date,                        // 작성일자
                author: item.nickname,                  // 작성자
                imageUrl: item.image,                   // 레시피 사진 URL
                ingredients: item.cocktails || [],      // 재료들
                liked: item.liked                       // 좋아요 여부
            })));

        } catch (error) {
            console.error('데이터를 가져오는 중 에러 발생: ', error)
        }
    }

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        getRecipeData();
    }, []);

    const handleViewAllClick = () => {
        navigate(`/user/${userId}/posts`); // 사용자 정의 경로로 이동
    };


    return (
            <Container sx={{marginTop: '30px'}}>
                <Box sx={{display: 'inline-flex', gap: 1}}>
                    <Typography sx={{fontWeight: 'bold'}} variant="h5">나만의
                        레시피</Typography>
                    <Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}}
                                variant="h5">{sizeNum}</Typography>
                </Box>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Typography sx={{flexGrow: 1}}>{nickname}님의 칵테일 레시피예요🍸</Typography>
                    <Button p={10} sx={{color: '#ff9b9b'}} onClick={handleViewAllClick}>전체보기</Button>
                </Box>

                <Box sx={{display: 'flex'}}>
                    <div className={style.cardList}>
                        {recipeData.map(recipe => (
                            <RecipeItem
                                key={recipe.boardId}                // key는 각 요소를 고유하게 식별하기 위해 사용
                                boardId={recipe.boardId}
                                imageUrl={recipe.imageUrl}
                                title={recipe.title}
                                author={recipe.author}
                                tags={[]}
                                liked={recipe.liked}
                                // liked={likedRecipes.includes(card.id)}
                            />
                        ))}
                    </div>

                    <NavLink
                        to="/writeBoard"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            margin: '20px auto',
                            width: '240px', // 크기 설정
                            height: '240px', // 크기 설정
                            backgroundColor: 'transparent', // 배경색을 투명으로 설정
                            border: '2px solid #ff9b9b', // 테두리 추가
                            borderRadius: '15px', // 테두리의 둥근 정도
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <QueueIcon sx={{fontSize: 48, color: '#ff9b9b'}}/>
                    </NavLink>
                </Box>
            </Container>
        );
    };
    export default MyRecipe;