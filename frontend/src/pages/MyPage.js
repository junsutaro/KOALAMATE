import React, {useState, useEffect} from 'react';
import Soju from 'assets/alcohol.png';
import {Typography, Box, Container, Chip, ButtonGroup, Button} from '@mui/material';
import Profile from '../components/Profile/Profile';
import MyRecipe from '../components/Profile/MyRecipe';
import LikeRecipe from '../components/Profile/LikeRecipe';
import ProfileData from '../components/Profile/ProfileData';
import {NavLink} from 'react-router-dom';


const MyPage = () => {
// 	const {user} = useSelector((state) => state.auth);
// 	const userNickname = user.nickname;
	const userNickname = '진평동 불주먹'
	const alcoholLimit = 7

	return (
			<Container>
				<ButtonGroup variant="outlined" aria-label="outlined button group" sx={{margin: '10px'}}>
					<Button component={NavLink} to="/user/1/update">프로필 수정</Button>
					<Button>회원정보 수정</Button>
					<Button>팔로우/팔로잉</Button>
				</ButtonGroup>
				<Box
						p={3}
						sx={{
							border:1,
							display: 'flex',
							borderColor: 'grey.500',
							borderRadius: '10px',
							flexDirection: 'row',
							gap: 10,
							'@media (max-width: 700px)': {
								flexDirection: 'column',
							},
						}}
				>
					<Profile nickname={userNickname}/>
					<ProfileData limit={alcoholLimit}/>
				</Box>
				<MyRecipe nickname={userNickname}/>
				<LikeRecipe nickname={userNickname} />

			</Container>
	);
};

export default MyPage;
