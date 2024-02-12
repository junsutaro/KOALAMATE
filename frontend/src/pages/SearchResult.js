import React, {useState} from 'react'
import style from "../components/RecipeBoard/RecipeList.module.css";
import RecipeItem from "../components/RecipeBoard/RecipeItem";
import PaginationComponent from "../components/PaginationComponent";

const SearchResult = ({searchResults, totalPages, setIsSearch}) => {
    const [likedRecipes, setLikedRecipes] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    // 검색 결과가 없을 경우 메시지 표시
    if (!searchResults.length) {
        return <div>검색 결과가 없습니다.</div>;
    }

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
            <h3>검색 결과</h3>
            <div className={style.cardList}>
                {searchResults.map(result => (
                    <RecipeItem
                        key={result.id}                // key는 각 요소를 고유하게 식별하기 위해 사용
                        boardId={result.id}
                        imageUrl={result.image}
                        title={result.title}
                        author={result.nickname}
                        tags={[]}
                        liked={result.liked}
                        toggleLiked={() => toggleLikedState(result.boardId)}
                        // liked={likedRecipes.includes(card.id)}
                    />
                ))}

            </div>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handlePageChange}
            />

        </>
    )
}
export default SearchResult