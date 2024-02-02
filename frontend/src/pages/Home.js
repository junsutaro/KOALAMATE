import React, {useEffect, useState} from 'react';
import {Button, Modal} from '@mui/material';
import {NavLink} from 'react-router-dom';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import refrigerator from 'assets/refrigerator_prev.glb';
import GLBLoderComponent from 'components/GLBLoaderComponent';

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

	return (
			<div>
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
			</div>
	);
};

export default Home;