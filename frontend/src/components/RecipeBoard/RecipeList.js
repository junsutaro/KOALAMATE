import React, {useEffect, useState} from 'react';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import style from 'components/RecipeBoard/RecipeList.module.css'; // 이 리스트를 위한 CSS 스타일을 정의할 수 있습니다.
import axios from 'axios';

function RecipeList() {
    const pageNum = 1
    const sizeNum = 2
    const [cardData, setCardData] = useState([])

    const getCardData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/board/list?page=${pageNum}&size=${sizeNum}`);
            const data = response.data;             // data는 레시피 목록을 포함하는 배열
            console.log(data);
            // 배열 데이터를 받아온 그대로 상태에 설정
            setCardData(data.map(item => ({
                id: item.id,                        // 레시피 id
                title: item.title,                  // 레시피 이름
                content: item.content,              // 레시피 내용
                date: item.date,                    // 작성일자
                author: item.nickname,              // 작성자
                imageUrl: item.image,               // 레시피 사진 URL
                ingredients: item.cocktails || [],  // 재료들
                comments: item.comments || [],      // 댓글
                likeCount: item.likeCount || 0,     // 좋아요 수
                liked: item.liked || false,         // 좋아요 여부
            })));
        } catch (error) {
            console.error('데이터를 가져오는 중 에러 발생: ', error);
        }
    };

    console.log(cardData)

    useEffect(() => {
        getCardData()
    }, []);


    return (
        <div className={style.cardList}>
            {cardData.map(card => (
                <RecipeItem
                    key={card.id}                // key는 각 요소를 고유하게 식별하기 위해 사용
                    id={card.id}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                    tags={[]}
                    liked={card.liked}
                />
            ))}
        </div>

    );
}

export default RecipeList;
