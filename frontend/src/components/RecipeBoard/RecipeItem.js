import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import style from "components/RecipeBoard/RecipeItem.module.css";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';


function RecipeItem({ id, imageUrl, title, author, tags, liked }) {
    const img = `http://localhost:3000/${imageUrl}`
    console.log(imageUrl)
  console.log(`liked: ${liked}`)
  const navigate = useNavigate();

  // 좋아요 상태를 추적하기 위한 상태 변수와 setter 함수
  const [isLiked, setIsLiked] = useState(liked);

  // 클릭 핸들러 함수
  const handleCardClick = () => {
    navigate(`/recipe/${id}`); // 레시피 상세 페이지로 이동
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 버튼 클릭 시 이벤트 버블링을 방지
    setIsLiked(!isLiked); // 좋아요 상태를 토글
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
          { console.log(`liked: ${isLiked}`) }
          {isLiked ? (
              <FavoriteIcon sx={{ fontSize: '2rem', color: '#FF9B9B' }} />
          ) : (
              <FavoriteTwoToneIcon sx={{ fontSize: '2rem', color: 'inherit' }} />
          )}
        </button>

      </div>
  );
}

export default RecipeItem;
