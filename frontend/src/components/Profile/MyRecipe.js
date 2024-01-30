import React from 'react';
import {Typography, Box, Container, Button} from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import {NavLink} from 'react-router-dom';

const MyRecipe = ({nickname}) => {
	const recipeLength = 3;
	return (
			<Container sx={{ marginTop: '30px' }}>
				<Box sx={{display: 'inline-flex', gap: 1}}>
					<Typography sx={{fontWeight: 'bold'}} variant="h5">나만의
						레시피</Typography>
					<Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}}
					            variant="h5">{recipeLength}</Typography>
				</Box>
				<Box sx={{display: 'flex', gap: 1}}>
					<Typography sx={{flexGrow: 1}}>{nickname}님의 칵테일 레시피예요🍸</Typography>
					<Button p={10} sx={{color: '#ff9b9b'}}>전체보기</Button>
				</Box>

				<NavLink
						to="/writeBoard"
						style={{
							textDecoration: 'none',
							color: 'inherit',

							width: '200px', // 크기 설정
							height: '200px', // 크기 설정
							backgroundColor: 'transparent', // 배경색을 투명으로 설정
							border: '2px solid #ff9b9b', // 테두리 추가
							borderRadius: '10px', // 테두리의 둥근 정도
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
				>
					<QueueIcon sx={{ fontSize: 48, color: '#ff9b9b' }} />
				</NavLink>
			</Container>
	);
};
export default MyRecipe;