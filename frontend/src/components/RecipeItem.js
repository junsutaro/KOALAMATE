
// 더미 데이터
// const dummy = [
// 	{
// 		id: 1,
// 		recipeName: '레시피1',
// 		writerName: '작성자1',
// 		recipeImg: '이미지 URL1',
// 		percent: '도수1',
// 		base: '베이스주1',
// 		tag: '태그1',
// 	},
// 	{
// 		id: 2,
// 		recipeName: '레시피2',
// 		writerName: '작성자2',
// 		recipeImg: '이미지 URL2',
// 		percent: '도수2',
// 		base: '베이스주2',
// 		tag: '태그2',
// 	},
// 	// 나머지 레시피 데이터...
// ];
//
// export default function RecipeItem({
// 		id,
// 		recipeName,
// 		writerName,
// 		recipeImg,
// 		percent,
// 		base,
// 		tag,
// }) {
// 	return (
// 			<div className={style.container}>
// 				<img className={style.recipe_img} src={recipeImg} />
// 				<div className={style.content}>
// 					<div className={style.recipe_name}>
// 						{recipeName}
// 					</div>
// 					<div>By {writerName}</div>
// 					<div>#{tag}</div>
// 				</div>
// 			</div>
// 	);
// }

import React from 'react';
import style from "components/RecipeItem.module.css";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

function RecipeItem({ imageUrl, title, author, tags }) {
	return (
			<div className={style.card}> {/* CSS 모듈 스타일 적용 */}
				<img src={imageUrl} alt={title} className={style.cardImage}/>
				<div className={style.cardContent}>
					<p className={style.cardTitle}>{title}</p>
					<p className={style.cardAuthor}>By {author}</p>
					<div className={style.cardTags}>
						{tags.map(tag => (
								<span className={style.tag} key={tag}>#{tag}</span> // key 속성을 태그로 사용하는 것은 중복될 수 있으니 고유한 값을 사용하는 것이 좋습니다.
						))}
					</div>
				</div>
				<button className={style.likeButton}>
					{/*<FavoriteBorderRoundedIcon style={{ fontSize: '2rem' }}/>*/}
					<FavoriteTwoToneIcon style={{ fontSize: '2rem' }}/>
				</button>
			</div>
	);
}

export default RecipeItem;
