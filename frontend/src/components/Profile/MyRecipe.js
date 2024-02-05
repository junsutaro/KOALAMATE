import React from 'react';
import {Typography, Box, Container, Button} from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import {NavLink} from 'react-router-dom';
import RecipeList from '../RecipeBoard/RecipeList';
import style from '../RecipeBoard/RecipeList.module.css';
import RecipeItem from '../RecipeBoard/RecipeItem';
import dummyrecipe_img1 from '../../assets/dummyrecipe_img1.jpg';
import dummyrecipe_img2 from '../../assets/dummyrecipe_img2.jpg';
import dummyrecipe_img3 from '../../assets/dummyrecipe_img3.jpg';
import dummyrecipe_img4 from '../../assets/dummyrecipe_img4.jpg';

const MyRecipe = ({nickname}) => {
	const recipeLength = 3;
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
		// {
		// 	id: 4,
		// 	imageUrl: dummyrecipe_img4,
		// 	title: '칵테일 이름',
		// 	author: '작성자2',
		// 	tags: ['태그3', '태그4'],
		// },
		// {
		// 	imageUrl: dummyrecipe_img5,
		// 	title: '칵테일 이름',
		// 	author: '작성자2',
		// 	tags: ['태그3', '태그4'],
		// },
		// ... 다른 카드 데이터들
	];
	return (
			<Container sx={{marginTop: '30px'}}>
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

				<Box sx={{display:'flex'}}>
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

				<NavLink
						to="/writeBoard"
						style={{
							textDecoration: 'none',
							color: 'inherit',
							margin: '20px auto',
							width: '240px', // 크기 설정
							height: '240px', // 크기 설정
							backgroundColor: 'transparent', // 배경색을 투명으로 설정
							border: '2px solid #ff9b9b', // 테두리 추가
							borderRadius: '15px', // 테두리의 둥근 정도
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
				>
					<QueueIcon sx={{fontSize: 48, color: '#ff9b9b'}}/>
				</NavLink>
				</Box>
			</Container>
	);
};
export default MyRecipe;