import {useNavigate} from 'react-router-dom';
import style from "./RecipeBoard/RecipeItem.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import React from "react";
const IngredientItem = ({drinkId, imageUrl, name, idx}) => {
    const img = `${process.env.REACT_APP_IMAGE_URL}/${imageUrl}`
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/drink/${drinkId}`);
    };

    const categories = [
        // '무알콜',
        '기타 재료',
        '진 베이스',
        '럼 베이스',
        '보드카 베이스',
        '위스키 베이스',
        '데킬라 베이스',
        '브랜디 베이스',
        '리큐르 베이스',
        '맥주 베이스',
        '소주 베이스',
    ];


    return (
        <div className={style.card} onClick={handleCardClick}>
            <img src={img} alt={name} className={style.cardImage}/>
            <div className={style.cardContent}>
                <p className={style.cardTitle}>{name}</p>
                <div className={style.cardTags}>
                        <span className={style.tag} key={idx}># {categories[idx]}</span>
                </div>
            </div>
        </div>
    );
}
export default IngredientItem