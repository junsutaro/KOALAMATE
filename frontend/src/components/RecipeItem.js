import style from "components/RecipeItem.module.css";

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