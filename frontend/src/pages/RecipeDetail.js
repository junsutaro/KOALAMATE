import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import CommentList from "components/Comment/CommentList";
import style from "../components/RecipeBoard/RecipeItem.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import {Typography, Box, Button, ListItem, ListItemText, List, ListItemAvatar, Avatar, Grid, Chip, Container} from "@mui/material";
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";


const RecipeDetail = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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
    const [isLiked, setIsLiked] = useState(false);
    const authHeader = localStorage.getItem('authHeader');

    const handleLikeClick = async (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            alert('좋아요를 누르려면 로그인을 하셔야 합니다. 로그인 해주세요.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/like`, {id: boardId, like: true}, {
                headers: {'Authorization': authHeader}
            });
            if(response.status === 200) {
                setIsLiked(!isLiked);
            } else {
                // 실패 응답 처리
                console.error('좋아요 변경 실패:', response);
            }
        } catch (error) {
            console.error('좋아요 상태를 변경하는 중 에러 발생:', error);
        }
    };

    const getDetailRecipe = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/board/view?id=${boardId}`,{ headers: {'Authorization': authHeader}});
            const data = response.data;
            console.log(data);
            setRecipe({
                id: data.id,
                title: data.title,
                content: data.content,
                date: format(new Date(data.date), 'yyyy년 MM월 dd일 HH:mm:ss'),
                views: data.views,
                image: `${data.image}` ,
                nickname: data.nickname,
                comments: data.comments || [],
                likeCount: data.likeCount,
                liked: data.liked,
                ingredients: data.cocktails || [],
            });
            setIsLiked(data.liked);
        } catch (error) {
            console.error('레시피 상세 정보를 가져오는 중 에러 발생: ', error);
        }
    };

    useEffect(() => {
        getDetailRecipe();
    }, [boardId]);


//     return (
//         <>
//             <Box m={3} p={2} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
//                 <Box>
//                     <Typography>{`${recipe.id}번째 레시피입니다`}</Typography>
//                     <Typography>제목: {recipe.title}</Typography>
//                     <Typography>내용: {recipe.content}</Typography>
//                     <Typography>작성자: {recipe.nickname}</Typography>
//                     <Typography>작성일: {recipe.date}</Typography>
//                     <Typography>조회수: {recipe.views}</Typography>
//                     <img src={recipe.image} />
//
//                     <List>
//                         {recipe.ingredients.map((ingredient, index) => (
//                             <ListItemText key={index}>
//                                 <div>이름: {ingredient.drink.name}</div>
//                                 <div>카테고리: {ingredient.drink.category}</div>
//                                 <div>비율: {ingredient.proportion} {ingredient.unit}</div>
//                                 <div>이미지: <img src={ingredient.drink.image} alt={ingredient.drink.name}/></div>
//                             </ListItemText>
//                         ))}
//                     </List>
//                 </Box>
//                 <Box display="flex" justifyContent="flex-end" alignItems="flex-end" marginTop={2}>
//                     <Button className={style.likeButton} onClick={handleLikeClick}>
//                         {isLiked ? (
//                             <FavoriteIcon sx={{fontSize: '2rem', color: '#FF9B9B'}}/>
//                         ) : (
//                             <FavoriteTwoToneIcon sx={{fontSize: '2rem', color: '#e9e9e9'}}/>
//                         )}
//                     </Button>
//                 </Box>
//             </Box>
//             <CommentList/>
//         </>
//     );
// }


    return (
        <div>
            <Chip label={`#${recipe.id}번째 레시피`} />
            <Paper sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '15px'}} elevation={3}>
                <Grid container spacing={5} justifyContent="center" display="flex" flexDirection="row">
                    <Grid item xs={12} sm={6}>
                        <Box component="img" src={recipe.image} sx={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: 600 }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                            <div>
                                <Typography variant="h6" sx={{ mb: 2 }}>{`#${recipe.id}번째 레시피`}</Typography>
                                <Typography variant="h5" color="#FF9B9B" sx={{ mt: 2, mb: 3 }}>{recipe.title}</Typography>
                                <Typography variant="h5" color='gray' sx={{ mb: 1 }}>By {recipe.nickname}</Typography>
                                <Typography color='gray' sx={{ mb: 2 }}>작성일: {recipe.date}</Typography>
                                <Typography color='#FF9B9B' sx={{ mt: 4, mb: 1}}>레시피 설명</Typography>
                                <Box sx={{ m:1, p: 2, border: '1px solid #FF9B9B', borderRadius: '15px' }}>{recipe.content}</Box>

                                    <Button onClick={handleLikeClick}>
                                        {isLiked ? (
                                            <FavoriteIcon sx={{ fontSize: '2rem', color: '#FF9B9B' }} />
                                        ) : (
                                            <FavoriteTwoToneIcon sx={{ fontSize: '2rem', color: '#e9e9e9' }} />
                                        )}
                                    </Button>

                            </div>
                        </Box>

                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" color="#FF9B9B" sx={{ mt: 7, mb: 1 }}>재료 정보</Typography>
            <Paper elevation={3} sx={{ margin: '20px', padding: 2, boxShadow: 3, backgroundColor: 'white', borderRadius: '15px'}}>
                <List>
                    {recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemAvatar>
                                <Avatar src={ingredient.drink.image} alt={ingredient.drink.name} sx={{ width: 56, height: 56, bgcolor: '#FF9B9B' }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={ingredient.drink.name}
                                secondary={`카테고리: ${ingredient.drink.category}`}
                                sx={{ margin: '0 16px', flex: '1 1 auto' }}
                            />
                            <Typography variant="body2" sx={{ minWidth: '50px', textAlign: 'right' }}>
                                {`${ingredient.proportion} ${ingredient.unit}`}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <CommentList />
        </div>
    );
}



export default RecipeDetail;
