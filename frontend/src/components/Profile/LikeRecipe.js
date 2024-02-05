import React from 'react';
import {Typography, Box, Container, Button} from '@mui/material';


const LikeRecipe = ({nickname}) => {
	const recipeLength = 3;
	return (
			<Container sx={{ marginTop: '30px' }}>
				<Box sx={{display: 'inline-flex', gap: 1}}>
					<Typography sx={{fontWeight: 'bold'}} variant="h5">좋아요한
						레시피</Typography>
					<Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}}
					            variant="h5">{recipeLength}</Typography>
				</Box>
				<Box sx={{display: 'flex', gap: 1}}>
					<Typography sx={{flexGrow: 1}}>{nickname}님이 좋아하는 칵테일 레시피예요🍹</Typography>
					<Button p={10} sx={{color: '#ff9b9b'}}>전체보기</Button>
				</Box>
				<div style={{
					width: '200px',
					height: '200px',
					backgroundColor: 'lightgray', // 배경색
					borderRadius: '10px', // 테두리의 둥근 정도
				}}> </div>
			</Container>
	);
};
export default LikeRecipe;