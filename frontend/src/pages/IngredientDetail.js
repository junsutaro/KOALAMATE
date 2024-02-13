import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import Recommend from "../components/Recommend";
import {Typography, Chip, Box, Container} from "@mui/material";

const IngredientDetail = () => {
    const {ingredientId} = useParams();
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

    const [ingredient, setIngredient] = useState({
        id: 0,
        name: "",
        category: 0,
        imageUrl: "",
        label: "",
        cocktails: [],
    })

    const [cocktailData, setCocktailData] = useState([])

    const getIngredientData = async () => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_IMAGE_URL}/drink/${ingredientId}`)
        const data = response.data
        setIngredient({
            id: data.id,
            name: data.name,
            category: data.category,
            imageUrl: data.image,
            label: data.label,
        })

            // cocktails 데이터가 비어있으면 빈 배열을 설정
            const cocktails = data.cocktails || [];
            setCocktailData(cocktails.map(item => ({
                boardId: item.board.id,
                title: item.board.title,
                content: item.board.content,
                date: item.board.date,
                author: item.board.nickname,
                imageUrl: item.board.image,
                ingredients: item.cocktails || [],
            })));
        } catch (error) {
            console.error('재료 데이터 가져오는 중 에러 발생 :',  error)
        }
    }

    useEffect(() => {
        getIngredientData()
    }, [ingredientId]);

    console.log(cocktailData || [])

    const img = `${process.env.REACT_APP_IMAGE_URL}/${ingredient.imageUrl}`
    const type = categories[ingredient.category]

    return (
        <Container sx={{ marginTop: 20}}>
            <h3>재료 상세</h3>
            <img src={img} alt={`${ingredient.name} 이미지`} />
            <Typography>{ingredient.name}</Typography>
            <Chip label={type} />
            <hr/>
            <Recommend cocktails={cocktailData}/>
        </Container>
    );
}
export default IngredientDetail;