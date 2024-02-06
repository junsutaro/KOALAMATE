import React from 'react'
import {List, ListItem, ListItemText} from "@mui/material";

const Ingredients = ({cocktails}) => {
    return (
        <>
            {cocktails.map((ingredient, index) => (
                <List key={index} sx={{ mt: 2 }}>
                    <ListItem>
                        <ListItemText
                            primary={`재료 이름: ${ingredient.drink.name}, 용량: ${ingredient.proportion}, 단위: ${ingredient.unit}`}
                        />
                    </ListItem>
                </List>
            ))}
        </>
    )
}
export default Ingredients