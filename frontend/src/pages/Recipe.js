import React from 'react';
import Nav from 'components/Nav';
import RecipeFilter from 'components/RecipeFilter';
import RecipeList from 'components/RecipeList';
import RecipeItem from 'components/RecipeItem';
import { Button, ButtonGroup, TextField } from '@mui/material';
import Searchbar from '../components/Searchbar';
import Ranking from '../components/Ranking';
import style from 'pages/Recipe.module.css';

const Recipe = () => {
	return (
			<div>
				<h1>레시피 조회 페이지</h1>
				<p></p>
				<div className={style.topContainer}>
					<ButtonGroup variant="outlined" aria-label="outlined button group">
						<Button>전체 조회</Button>
						<Button>레시피 백과</Button>
						<Button>유저 레시피</Button>
					</ButtonGroup>
					<Searchbar />
				</div>
				<hr/>
				<Ranking />
				<RecipeFilter />
				{/*<RecipeList recipe={recipe}/>*/}
				<RecipeList />
			</div>

	);
};

export default Recipe;