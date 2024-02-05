import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

const RecipeDetail = () => {
    const {boardId} = useParams(); // URL 파라미터에서 boardId 추출
    const [recipe, setRecipe] = useState({
        id: 0,
        title: "",
        content: "",
        date: "",
        views: 0,
        nickname: "",
        comments: [],
        likeCount: 0,
        liked: false,
        ingredients: []
    })

    const getDetailRecipe = async() => {
        try {
            const response = await axios.get(`http://localhost:8080/board/view?id=${boardId}`)
            const data = response.data

            setRecipe({
                id: data.id,
                title: data.title,
                content: data.content,
                date: data.date,
                views: data.views,
                nickname: data.nickname,
                comments: data.comments || [],
                likeCount: data.likeCount,
                liked: data.liked,
                ingredients: data.cocktails || [],
            })
        }
        catch (error) {
            console.error('데이터를 가져오는 중 에러 발생: ', error)
        }
    }

    useEffect(() => {
        getDetailRecipe()
    }, [boardId]);


    return (
        <div>
            <div>{`${recipe.id}번째 레시피입니다`}</div>
            <div>{recipe.title}</div>
            <div>{recipe.content}</div>
            <div>{recipe.date}</div>
            <div>{recipe.views}</div>
            <div>{recipe.nickname}</div>
            <div>{recipe.comments}</div>
            <div>{recipe.likeCount}</div>
            <div>{recipe.liked}</div>
            <div>{recipe.ingredients}</div>
        </div>
    );
}


export default RecipeDetail;