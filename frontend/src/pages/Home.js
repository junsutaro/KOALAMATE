import React, {useEffect, useState} from 'react';
import {Button, Container, Modal} from '@mui/material';
import {NavLink} from 'react-router-dom';

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import GLBLoderComponent from 'components/GLBLoaderComponent';
import FridgeModal from '../components/Fridge/FridgeModal';

import ImageSlider from 'components/home/ImageSlider';
import HomeRecipeList from "../components/home/HomeRecipeList";
import SimpleMap from 'components/home/SimpleMap';

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
			<div className={'sliderStyle'}>
				<ImageSlider />
			</div>
			<Container>
				<p></p>
				<h2>궁금한 레시피</h2>
				<p>너무나 복잡한 칵테일 레시피, 쉽게 찾고 공유해요</p>
				<HomeRecipeList optionNum={1} currentPage={5}/>
				<br></br>
				<h2>내 주변의 냉장고 & 메이트 찾기</h2>
				<SimpleMap />
				<h1>Home</h1>
				<Button color="inherit" component={NavLink} to="/writeBoard">
					write
				</Button>
				<Button onClick={handleOpen}>모델 렌더링</Button>
				<Modal open={open}
					   onClose={handleClose}
					   aria-labelledby="modal-modal-title"
					   aria-describedby="modal-modal-description"
					   style={{
						   overflow: 'scroll',
						   backdropFilter: 'blur(3px)',
						   backgroundColor: 'rgba(0, 0, 0, 0.7)',
					   }}
				>
					<div style={style}>
						{open && <GLBLoderComponent/>}
						<Button onClick={handleClose} variant={'contained'}>qwer</Button>
					</div>
				</Modal>
				<p>Welcome to the home page of our website!</p>
			</Container>
		</div>
	);
};

export default Home;