// import RecipeItem from "components/RecipeItem";
//
// export default function RecipeList({ recipes }) {
// 	return <div>
// 		{recipes.map((recipe) => (
// 				<RecipeItem key={recipe.id} {...recipe}/>
// 		))}
// 	</div>;
// }
//
//
// // 빈 리스트일 경우 오류 방지
// RecipeList.defaultProps = {
// 	recipes: [],
// };

import React from 'react';
import RecipeItem from 'components/RecipeBoard/RecipeItem';
import style from 'components/RecipeBoard/RecipeList.module.css'; // 이 리스트를 위한 CSS 스타일을 정의할 수 있습니다.
import dummyrecipe_img1 from 'assets/dummyrecipe_img1.jpg'
import dummyrecipe_img2 from 'assets/dummyrecipe_img2.jpg'
import dummyrecipe_img3 from 'assets/dummyrecipe_img3.jpg'
import dummyrecipe_img4 from 'assets/dummyrecipe_img4.jpg'
// import dummyrecipe_img5 from 'assets/dummyrecipe_img5.jpg'

const cardData = [
	{
		id: 1,
		imageUrl: dummyrecipe_img1,
		title: '칵테일 이름',
		author: '작성자',
		tags: ['태그1', '태그2'],
	},
	{
		id: 2,
		imageUrl: dummyrecipe_img2,
		title: '칵테일 이름',
		author: '작성자2',
		tags: ['태그3', '태그4'],
	},
	{
		id: 3,
		imageUrl: dummyrecipe_img3,
		title: '칵테일 이름',
		author: '작성자2',
		tags: ['태그3', '태그4'],
	},
	{
		id: 4,
		imageUrl: dummyrecipe_img4,
		title: '칵테일 이름',
		author: '작성자2',
		tags: ['태그3', '태그4'],
	},
	// {
	// 	imageUrl: dummyrecipe_img5,
	// 	title: '칵테일 이름',
	// 	author: '작성자2',
	// 	tags: ['태그3', '태그4'],
	// },
	// ... 다른 카드 데이터들
];

function RecipeList() {
	return (
			<div className={style.cardList}>
				{cardData.map(card => (
						<RecipeItem
								key={card.id} // key는 각 요소를 고유하게 식별하기 위해 사용됩니다.
								id={card.id}
								imageUrl={card.imageUrl}
								title={card.title}
								author={card.author}
								tags={card.tags}
						/>
				))}
			</div>
	);
}

export default RecipeList;
