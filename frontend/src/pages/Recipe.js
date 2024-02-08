import React, {useState} from 'react';
import RecipeFilter from 'components/RecipeBoard/RecipeFilter';
import RecipeList from 'components/RecipeBoard/RecipeList';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import Searchbar from '../components/RecipeBoard/Searchbar';
import PopularRecipes from '../components/RecipeBoard/PopularRecipes';
import style from 'pages/Recipe.module.css';
import RecipeButton from 'components/RecipeBoard/RecipeButton';

const Recipe = () => {
	// 옵션 숫자 1: 전체 레시피 조회, 2: 관리자(admin) 레시피 조회, 3: 유저 레시피 조회
	const [optionNum, setOptionNum] = useState(1)

	return (
			<div>
				<h1>레시피 조회 페이지</h1>
				<p></p>
				<div className={style.topContainer}>
					<RecipeButton setOptionNum={setOptionNum} />
					<Searchbar />
				</div>
				<hr/>
				<PopularRecipes />
				<RecipeFilter />
				{/*<RecipeList recipe={recipe}/>*/}
				<RecipeList optionNum={optionNum} />
			</div>

	);
};

export default Recipe;