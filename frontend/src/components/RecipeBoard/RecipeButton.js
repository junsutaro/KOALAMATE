import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function RecipeButtons() {
	// 버튼 클릭 이벤트 핸들러 함수들
	const handleAllRecipesClick = () => {
		console.log('전체 조회');
	};

	const handleKoalaRecipesClick = () => {
		console.log('레시피 백과');
	};

	const handleUserRecipesClick = () => {
		console.log('유저 레시피');
	};

	return (
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				{/* 독립적인 '전체 조회' 버튼 */}
				<Button
						variant="filledTonal"
						style={{
							backgroundColor: '#FF9B9B',
							color: 'white',
							borderRadius: '10px',
							fontWeight: 'bold'
						}}
						onClick={handleAllRecipesClick}
				>
					전체 조회
				</Button>

				{/* '레시피 백과'와 '유저 레시피'를 포함한 버튼 그룹 */}
				<ButtonGroup
						variant="outlined"
						aria-label="outlined secondary button group"
						style={{ borderColor: '#FF9B9B', gap: '10px' }}
				>
					<Button
							onClick={handleKoalaRecipesClick}
							style={{
								borderColor: '#FF9B9B',
								color: '#FF9B9B',
								borderRadius: '10px',
								fontWeight: 'bold',
							}}
					>
						레시피 백과
					</Button>
					<Button
							onClick={handleUserRecipesClick}
							style={{
								borderColor: '#FF9B9B',
								color: '#FF9B9B',
								borderRadius: '10px',
								fontWeight: 'bold',
							}}
					>
						유저 레시피
					</Button>
				</ButtonGroup>
			</div>
	);
}

export default RecipeButtons;
