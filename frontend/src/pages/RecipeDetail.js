import React from 'react';
import {useParams} from 'react-router-dom';




function RecipeDetail() {
	const { boardId } = useParams(); // URL 파라미터에서 boardId 추출


return (
		<div>
			레시피 상세페이지
		</div>
	);
}


export default RecipeDetail;