import style from "components/RecipeItem.module.css";

// 더미 데이터
const dummy = [
	{
		id: 1,
		recipeName: '레시피1',
		writerName: '작성자1',
		recipeImg: '이미지 URL1',
		percent: '도수1',
		base: '베이스주1',
		tag: '태그1',
	},
	{
		id: 2,
		recipeName: '레시피2',
		writerName: '작성자2',
		recipeImg: '이미지 URL2',
		percent: '도수2',
		base: '베이스주2',
		tag: '태그2',
	},
	// 나머지 레시피 데이터...
];

export default function RecipeItem({
		id,
		recipeName,
		writerName,
		recipeImg,
		percent,
		base,
		tag,
}) {
	return (
			<div className={style.container}>
				<img className={style.recipe_img} src={recipeImg} />
				<div className={style.content}>
					<div className={style.recipe_name}>
						{recipeName}
					</div>
					<div>By {writerName}</div>
					<div>#{tag}</div>
				</div>
			</div>
	);
}