import React from 'react';
import RecipeFilter from 'components/RecipeBoard/RecipeFilter';
import RecipeList from 'components/RecipeBoard/RecipeList';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import Searchbar from '../components/RecipeBoard/Searchbar';
import PopularRecipes from '../components/RecipeBoard/PopularRecipes';
import style from 'pages/Recipe.module.css';
import RecipeButton from 'components/RecipeBoard/RecipeButton';

const Recipe = () => {
	return (
			<div>
				<h1>레시피 조회 페이지</h1>
				<p></p>
				<div className={style.topContainer}>
					<RecipeButton/>
					<Searchbar />
				</div>
				<hr/>
				<PopularRecipes />
				<RecipeFilter />
				{/*<RecipeList recipe={recipe}/>*/}
				<RecipeList />
			</div>

	);
};

export default Recipe;