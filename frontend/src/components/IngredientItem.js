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
        '진',
        '럼',
        '보드카',
        '위스키',
        '데킬라',
        '브랜디',
        '리큐르',
        '맥주',
        '소주',
    ];

    console.log(idx)
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