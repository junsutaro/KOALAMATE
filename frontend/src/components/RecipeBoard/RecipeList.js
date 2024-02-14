import React, {useEffect, useState} from 'react';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import style from 'components/RecipeBoard/RecipeList.module.css'
import axios from 'axios';
import PaginationComponent from 'components/PaginationComponent'


function RecipeList({optionNum, filter }) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const sizeNum = 8

    // const [category, setCategory] = useState(null);
    // const [minIngredients, setMinIngredients] = useState(2); // 필터 초기값 설정
    // const [maxIngredients, setMaxIngredients] = useState(10); // 필터 초기값 설정
    const [cardData, setCardData] = useState([])
    const [likedRecipes, setLikedRecipes] = useState([]);

    // 인증 토큰 가져오기
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? {Authorization: authHeader} : {};
    };

    // // 사용자가 좋아요한 레시피 목록 불러오기 (마운트될 때만 실행)
    // useEffect(() => {
    //     if (localStorage.getItem('authHeader')) {
    //         const fetchLikedRecipes = async () => {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/myLikesWithoutPageable`, {
    //                 headers: getAuthHeader(), // 인증 헤더 추가
    //             });
    //             const data = response.data  // 빈 배열 또는 좋아요한 레시피 아이디가 있는 배열
    //             setLikedRecipes(data)
    //             getCardData(data)          // 레시피 목록을 불러오는 동시에, 각 레시피가 좋아요한 목록에 속하는지를 확인하여 liked 상태를 결정
    //         }
    //         fetchLikedRecipes();
    //     } else {
    //         // 로그인하지 않은 사용자는 likedRecipes를 빈 배열로 설정하여 getCardData 호출
    //         getCardData([]);
    //     }
    // }, []);
    //
    // const getCardData = async (likedRecipes) => {
    //     // 카테고리에 따라 URL을 조정하여 API 호출
    //     let url = `${process.env.REACT_APP_API_URL}/board/list?page=${currentPage}&size=${sizeNum}&option=${optionNum}`
    //     if (category !== null) {
    //         url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCategory?page=${currentPage}&size=${sizeNum}&category=${category}`
    //     }
    //     try {
    //         const response = await axios.get(url);
    //         const data = response.data.content;         // data는 레시피 목록을 포함하는 배열
    //         setTotalPages(response.data.totalPages)     // 총 페이지 수
    //
    //         // 배열 데이터를 받아온 그대로 상태에 설정
    //         setCardData(data.map(item => ({
    //             boardId: item.id,                       // 레시피 id
    //             title: item.title,                      // 레시피 이름
    //             content: item.content,                  // 레시피 내용
    //             date: item.date,                        // 작성일자
    //             author: item.nickname,                  // 작성자
    //             imageUrl: item.image,                   // 레시피 사진 URL
    //             ingredients: item.cocktails || [],      // 재료들
    //             liked: likedRecipes.includes(item.id)   // 좋아요 여부
    //         })));
    //     } catch (error) {
    //         console.error('데이터를 가져오는 중 에러 발생: ', error);
    //     }
    // };
    //
    // useEffect(() => {
    //     getCardData(likedRecipes);
    // }, [currentPage, optionNum, likedRecipes,  category]);

    // const getCardData = async () => {
    //     // 카테고리에 따라 URL을 조정하여 API 호출
    //     let url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCountAndCategory?page=${currentPage}&size=${sizeNum}&minDrinks=${minIngredients}&maxDrinks=${maxIngredients}&option=${optionNum}`
    //     if (category !== null) {
    //         url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCountAndCategory?page=${currentPage}&size=${sizeNum}&minDrinks=${minIngredients}&maxDrinks=${maxIngredients}&category=${category}&option=${optionNum}`
    //     }
    //     try {
    //         const response = await axios.get(url,
    //             {
    //                 headers: getAuthHeader(), // 인증 헤더 추가
    //             })
    //         const data = response.data.content
    //         setTotalPages(response.data.totalPages)     // 총 페이지 수
    //
    //         setCardData(data.map(item => ({
    //             boardId: item.id,                       // 레시피 id
    //             title: item.title,                      // 레시피 이름
    //             content: item.content,                  // 레시피 내용
    //             date: item.date,                        // 작성일자
    //             author: item.nickname,                  // 작성자
    //             imageUrl: item.image,                   // 레시피 사진 URL
    //             ingredients: item.cocktails || [],      // 재료들
    //             liked: item.liked                       // 좋아요 여부
    //         })));
    //
    //     } catch (error) {
    //         console.error('유저가 작성한 레시피 데이터를 가져오는 중 에러 발생: ', error)
    //     }
    // }
    //
    // useEffect(() => {
    //     getCardData(likedRecipes);
    // }, [currentPage, optionNum, category, minIngredients, maxIngredients]);

    const { category, minIngredients, maxIngredients } = filter; // filter prop에서 필터 값을 추출

    useEffect(() => {
        // API 호출을 위한 URL 구성
        let url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCountAndCategory?page=${currentPage}&size=${sizeNum}&minDrinks=${minIngredients}&maxDrinks=${maxIngredients}&option=${optionNum}`;
        if (category !== null) {
            url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCountAndCategory?page=${currentPage}&size=${sizeNum}&minDrinks=${minIngredients}&maxDrinks=${maxIngredients}&category=${filter.category}&option=${optionNum}`
        }
        if (category == null){
            url = `${process.env.REACT_APP_API_URL}/board/searchByDrinkCountAndCategory?page=${currentPage}&size=${sizeNum}&minDrinks=${minIngredients}&maxDrinks=${maxIngredients}&option=${optionNum}`;
        }
        console.log(url)
        const getAuthHeader = () => {
            const authHeader = localStorage.getItem('authHeader');
            return authHeader ? { Authorization: authHeader } : {};
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(url, { headers: getAuthHeader() });
                setTotalPages(response.data.totalPages);
                setCardData(response.data.content); // 레시피 데이터 설정
                // setCardData(response.data.content.map(item => ({
                //     boardId: item.id,
                //     title: item.title,
                //     content: item.content,
                //     date: item.date,
                //     author: item.nickname,
                //     imageUrl: item.image,
                //     liked: item.liked // 이전 예시와 달리, 서버 응답에서 직접 liked 상태를 가져옵니다.
                // })));
            } catch (error) {
                console.error('데이터를 가져오는 중 에러 발생: ', error);
            }
        };

        fetchData();
    }, [currentPage, optionNum, category, minIngredients, maxIngredients]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const toggleLikedState = async (boardId) => {
        const isLiked = likedRecipes.includes(boardId);
        const newLikedRecipes = isLiked ? likedRecipes.filter(id => id !== boardId) : [...likedRecipes, boardId];
        setLikedRecipes(newLikedRecipes);
    };


    return (
        <>
            <div className={style.cardList}>
                {/*{cardData.map(card => (*/}
                {/*    <RecipeItem*/}
                {/*        key={card.boardId}                // key는 각 요소를 고유하게 식별하기 위해 사용*/}
                {/*        boardId={card.boardId}*/}
                {/*        imageUrl={card.imageUrl}*/}
                {/*        title={card.title}*/}
                {/*        author={card.author}*/}
                {/*        tags={[]}*/}
                {/*        liked={card.liked}*/}
                {/*        toggleLiked={() => toggleLikedState(card.boardId)}*/}
                {/*        // liked={likedRecipes.includes(card.id)}*/}
                {/*    />*/}
                {/*))}*/}
                {cardData.map((card) => (
                    <RecipeItem
                        key={card.boardId}
                        boardId={card.boardId}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        author={card.author}
                        liked={card.liked}
                        // 여기서 필요한 props를 추가로 전달할 수 있습니다.
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
