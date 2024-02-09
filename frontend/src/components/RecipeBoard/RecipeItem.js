import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "components/RecipeBoard/RecipeItem.module.css";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus } from '../../store/authSlice';

function RecipeItem({ boradId, imageUrl, title, author, tags, liked }) {
    const img = `${process.env.REACT_APP_IMAGE_URL}/${imageUrl}`
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(liked);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const refreshToken = useSelector(state => state.auth.refreshToken); // 리프레시 토큰을 가져옵니다.



    // 클릭 핸들러 함수
    const handleCardClick = () => {
        navigate(`/recipe/${boradId}`); // 레시피 상세 페이지로 이동
    };

    // 로그인 여부를 확인하여 로그인한 사용자에게만 좋아요 기능 활성화
    const handleLikeClick = async (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지

        const authHeader = localStorage.getItem('authHeader'); // 인증 토큰 가져오기
        if (!authHeader) {
            console.error('Authorization token is missing');
            return;
        }

        if (isLoggedIn) { // 로그인한 경우에만 좋아요 기능 활성화
            const newLikedState = !isLiked;
            setIsLiked(newLikedState);
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/board/like`, {
                    id: boradId}, {
                    headers: {
                        'Authorization': authHeader // 요청 헤더에 인증 토큰 추가
                    }
                })
                console.log('좋아요 상태 변경 성공');
            } catch (error) {
                console.error('좋아요 상태 변경 실패', error);
                setIsLiked(!newLikedState);    // 에러가 발생하면 좋아요 상태를 원래대로 되돌림
            }
        } else {
            // 로그인하지 않은 경우에는 로그인 페이지로 이동하도록 메시지를 띄웁니다.
            alert('좋아요를 누르려면 로그인을 하셔야 합니다. 로그인 해주세요.');

        }
    };

    return (
        <div className={style.card} onClick={handleCardClick}> {/* CSS 모듈 스타일 적용 */}
            <img src={img} alt={title} className={style.cardImage}/>
            <div className={style.cardContent}>
                <p className={style.cardTitle}>{title}</p>
                <p className={style.cardAuthor}>By {author}</p>
                <div className={style.cardTags}>
                    {tags.map(tag => (
                        <span className={style.tag} key={tag}>#{tag}</span> // key 속성을 태그로 사용하는 것은 중복될 수 있으니 고유한 값을 사용하는 것이 좋습니다.
                    ))}
                </div>
            </div>
            <button className={style.likeButton} onClick={handleLikeClick}>
                {console.log(`liked: ${isLiked}`)}
                {isLiked ? (
                    <FavoriteIcon sx={{fontSize: '2rem', color: '#FF9B9B'}}/>
                ) : (
                    <FavoriteTwoToneIcon sx={{fontSize: '2rem', color: '#e9e9e9'}}/>
                )}
            </button>

        </div>
    );
}

export default RecipeItem;
