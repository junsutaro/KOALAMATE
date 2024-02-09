import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import CommentList from "components/Comment/CommentList";
import style from "../components/RecipeBoard/RecipeItem.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Typography, Box, Button, ListItemText, List } from "@mui/material";
import { format } from 'date-fns';

const RecipeDetail = () => {
    const { boardId } = useParams(); // URL 파라미터에서 boardId 추출
    const [recipe, setRecipe] = useState({
        id: 0,
        title: "",
        content: "",
        date: "",
        views: 0,
        nickname: "",
        image:'',
        comments: [],
        likeCount: 0,
        liked: false,
        ingredients: []
    });

    // 좋아요 상태를 추적하기 위한 상태 변수와 setter 함수
    const [isLiked, setIsLiked] = useState(recipe.liked);

    const handleLikeClick = (e) => {
        e.stopPropagation(); // 버튼 클릭 시 이벤트 버블링을 방지
        setIsLiked(!isLiked); // 좋아요 상태를 토글
    };

    const getDetailRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/board/view?id=${boardId}`);
            const data = response.data;
            setRecipe({
                id: data.id,
                title: data.title,
                content: data.content,
                date: format(new Date(data.date), 'yyyy년 MM월 dd일 HH:mm:ss'),
                views: data.views,
                image: `${process.env.REACT_APP_IMAGE_URL}/${data.image}` ,
                nickname: data.nickname,
                comments: data.comments || [],
                likeCount: data.likeCount,
                liked: data.liked,
                ingredients: data.cocktails || [],
            });
        } catch (error) {
            console.error('레시피 상세 정보를 가져오는 중 에러 발생: ', error);
        }
    };

    useEffect(() => {
        getDetailRecipe();
    }, [boardId]);

    return (
        <>
            <Box m={3} p={2} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                <Box>
                    <Typography>{`${recipe.id}번째 레시피입니다`}</Typography>
                    <Typography>제목: {recipe.title}</Typography>
                    <Typography>내용: {recipe.content}</Typography>
                    <Typography>작성자: {recipe.nickname}</Typography>
                    <Typography>작성일: {recipe.date}</Typography>
                    <Typography>조회수: {recipe.views}</Typography>
                    <img src={recipe.image} />

                    <List>
                        {recipe.ingredients.map((ingredient, index) => (
                            <ListItemText key={index}>
                                <div>이름: {ingredient.drink.name}</div>
                                <div>카테고리: {ingredient.drink.category}</div>
                                <div>비율: {ingredient.proportion} {ingredient.unit}</div>
                                <div>이미지: <img src={ingredient.drink.image} alt={ingredient.drink.name}/></div>
                            </ListItemText>
                        ))}
                    </List>
                </Box>
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" marginTop={2}>
                    <Button className={style.likeButton} onClick={handleLikeClick}>
                        {isLiked ? (
                            <FavoriteIcon sx={{fontSize: '2rem', color: '#FF9B9B'}}/>
                        ) : (
                            <FavoriteTwoToneIcon sx={{fontSize: '2rem', color: '#e9e9e9'}}/>
                        )}
                    </Button>
                </Box>
            </Box>
            <CommentList/>
        </>
    );
}

export default RecipeDetail;
