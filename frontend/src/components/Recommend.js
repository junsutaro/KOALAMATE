import style from "./RecipeBoard/RecipeList.module.css";
import RecipeItem from "./RecipeBoard/RecipeItem";
import PaginationComponent from "./PaginationComponent";
import React from "react";
import {Box, Button, Typography} from "@mui/material";

const Recommend = ({cocktails}) => {
    
    return (<>
        <>
            <Box sx={{display: 'inline-flex', gap: 1}}>
                <Typography sx={{fontWeight: 'bold'}} variant="h5">
                    🍸 해당 재료로 만들 수 있는 칵테일
                </Typography>
                <Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}}
                            variant="h5">{cocktails.length}</Typography>
            </Box>

            <div className={style.cardList}>
                {cocktails.map(cocktail => (
                    <RecipeItem
                        key={cocktail.boardId}
                        boardId={cocktail.boardId}
                        imageUrl={cocktail.imageUrl}
                        title={cocktail.title}
                        author={cocktail.author}
                        tags={[]}
                        // liked={false}
                        // toggleLiked={}
                    />
                ))}

            </div>
            {/*<PaginationComponent*/}
            {/*    totalPages={totalPages}*/}
            {/*    currentPage={currentPage}*/}
            {/*    onChangePage={handlePageChange}*/}
            {/*/>*/}
        </>
    </>)
}
export default Recommend