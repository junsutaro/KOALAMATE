import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container, Link,
	Modal,
	Paper, TextField,
	Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import ImageSlider from 'components/home/ImageSlider';
import HomeRecipeList from '../components/home/HomeRecipeList';
import SimpleMap from 'components/home/SimpleMap';
import Stack from '@mui/material/Stack';

const Home = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '100%',
		height: '100%',
		bgcolor: 'rgba(0, 0, 0, 1)',
		border: 'none',
		boxShadow: 24,
		p: 4,
		overflow: 'hidden',
	};

	// currentPage={1}로 바꿔서 최신 글이 홈에 올라오게 바꿔야함
	return (
		<div>
			<Container sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
				<Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
					<Typography
						component="h1"
						variant="h1"
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							alignSelf: 'center',
							textAlign: 'center',
						}}
					>
						코알라&nbsp;
						<Typography
							component="span"
							variant="h1"
							sx={{
								color: (theme) =>
									theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
							}}
						>
							메이트
						</Typography>
					</Typography>
					<Typography variant="body1" textAlign="center" color="text.secondary">
						Explore our cutting-edge dashboard, delivering high-quality solutions
						tailored to your needs. <br />
						Elevate your experience with top-tier features and services.
					</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						alignSelf="center"
						spacing={1}
						useFlexGap
						sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
					>
						<TextField
							id="outlined-basic"
							hiddenLabel
							size="small"
							variant="outlined"
							aria-label="Enter your email address"
							placeholder="Your email address"
							inputProps={{
								autocomplete: 'off',
								ariaLabel: 'Enter your email address',
							}}
						/>
						<Button variant="contained" color="primary">
							Start now
						</Button>
					</Stack>
					<Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
						By clicking &quot;Start now&quot; you agree to our&nbsp;
						<Link href="#" color="primary">
							Terms & Conditions
						</Link>
						.
					</Typography>
				</Stack>
				{/*<Box mb={4}>*/}
				{/*	<Paper elevation={3} sx={{background: "white"}}>*/}
				{/*		<ImageSlider/>*/}
				{/*	</Paper>*/}
				{/*</Box>*/}
				<Box mb={4}>
						<Typography variant={'h2'} align={'center'}>
							궁금한 레시피
						</Typography>
						<Typography variant={'h5'} align={'center'}>
							너무나 복잡한 칵테일 레시피, 쉽게 찾고 공유해요
						</Typography>
						<HomeRecipeList optionNum={1} currentPage={5}/>
				</Box>
				<Box mb={4}>
					<Paper elevation={3} sx={{background: "white"}}>
						<h2>내 주변의 냉장고 & 메이트 찾기</h2>
						<SimpleMap/>
					</Paper>
				</Box>
			</Container>
		</div>
	);
};

export default Home;