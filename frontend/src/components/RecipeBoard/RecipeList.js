import React, {useEffect, useState} from 'react';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import style from 'components/RecipeBoard/RecipeList.module.css'
import axios from 'axios';
import PaginationComponent from 'components/PaginationComponent'


function RecipeList({optionNum}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const sizeNum = 8
    const [cardData, setCardData] = useState([])
    console.log(optionNum)

    const getCardData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/board/list?page=${currentPage}&size=${sizeNum}&option=${optionNum}`);
            const data = response.data.content;         // data는 레시피 목록을 포함하는 배열
            setTotalPages(response.data.totalPages)     // 총 페이지 수

            // 배열 데이터를 받아온 그대로 상태에 설정
            setCardData(data.map(item => ({
                boradId: item.id,                   // 레시피 id
                title: item.title,                  // 레시피 이름
                content: item.content,              // 레시피 내용
                date: item.date,                    // 작성일자
                author: item.nickname,              // 작성자
                imageUrl: item.image,               // 레시피 사진 URL
                ingredients: item.cocktails || [],  // 재료들
                // comments: item.comments || [],      // 댓글
                likeCount: item.likeCount || 0,     // 좋아요 수
                liked: item.liked || false          // 좋아요 여부
            })));
        } catch (error) {
            console.error('데이터를 가져오는 중 에러 발생: ', error);
        }
    };

    useEffect(() => {
        getCardData()
    }, [currentPage, optionNum]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <div className={style.cardList}>
                {cardData.map(card => (
                    <RecipeItem
                        key={card.boradId}                // key는 각 요소를 고유하게 식별하기 위해 사용
                        boradId={card.boradId}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        author={card.author}
                        tags={[]}
                        liked={card.liked}
                    />
                ))}

            </div>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handlePageChange}
            />
        </>
    );
}

export default RecipeList;
