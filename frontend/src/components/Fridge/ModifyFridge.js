import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Box, Button} from '@mui/material';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import FridgeModel from './FridgeModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';
import Loader from './Loader';
import TrashcanModel from './TrashcanModel';
import ENV_URL from 'assets/brown_photostudio_02_4k.exr';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import {OrbitControls, useGLTF} from '@react-three/drei';
import { useWebSocket } from '../../context/WebSocketContext';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function Environment() {
	const { scene } = useThree();
	const exrTexture = useLoader(EXRLoader, ENV_URL);


	useEffect(() => {

		exrTexture.mapping = THREE.EquirectangularReflectionMapping;
		scene.environment = exrTexture;
	}, [exrTexture, scene]);

	return null;
}

function ModifyFridge() {
	const pointLightRef = useRef();
	const [fridgeUuid, setFridgeUuid] = React.useState(null);
	const { roomStatus } = useWebSocket();
	const [models, setModels] = useState([]);
	const navigate = useNavigate();

	const handleSave = () => {
		if (models.length >= 0) {
			console.log(models);
			const requestObj = models.map(model => ({
				src: model.url,
				posX: model.object.position.x,
				posY: model.object.position.y
			}));
			console.log(requestObj);
			axios.put(`${process.env.REACT_APP_API_URL}/refrigerator/addCustomobjs`, requestObj, {
				headers: {
					'Authorization': localStorage.getItem('authHeader'),
				}
			})
				.then(() => {
					console.log('custom object added');
					navigate(-1);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		// axios.post(`${process.env.REACT_APP_API_URL}/refrigerator/addCustomobjs`, {})
	}

	useEffect(() => {
		const loadModel = (url) => {
			return new Promise((resolve, reject) => {
				const loader = new GLTFLoader();
				loader.load(url, resolve, undefined, reject);
			});
		};
		axios.post(`${process.env.REACT_APP_API_URL}/user/myId`, null, {
			headers: {
				'Authorization': localStorage.getItem('authHeader'),
			}
		}).then(response => {
			axios.get(`${process.env.REACT_APP_API_URL}/refrigerator/object/${response.data}`).then(
				async (response) => {
					console.log(response.data);
					const promises = response.data.objs.map(obj=> loadModel(obj.src).then(gltf => ({
						isNew: false,
						object: gltf.scene,
						position: [obj.posX, obj.posY, 1.4],
						url: obj.src
					})));
					Promise.all(promises).then(modelData => {
						setModels(modelData);
					});
				});
		});
	}, []);

	useEffect(() => {
		console.log(roomStatus);
		console.log(pointLightRef.current);
		if (pointLightRef.current) {
			console.log(pointLightRef.current);
			pointLightRef.current.shadow.mapSize.width = 2048; // 그림자 맵의 너비 설정
			pointLightRef.current.shadow.mapSize.height = 2048; // 그림자 맵의 높이 설정
		}
	}, [pointLightRef]);

	return (
		<Box height='800px'>
			<Canvas camera={{ position: [0, 0, 6], fov: 60 }} shadows antialias='true' colorManagement={true} shadowMap={{ type: THREE.VSMShadowMap }}>
				{/*<OrbitControls />*/}
				{/*<ambientLight intensity={0.5}/>*/}
				{/*<spotLight position={[-3, 3, 3]} angle={0.15} penumbra={0.5} castShadow/>*/}
				{/*<directionalLight ref={directionalLightRef} position={[10, 5, 5]} intensity={5} castShadow/>*/}
				<pointLight ref={pointLightRef} position={[5, 5, 5]} intensity={100} castShadow/>
				<Suspense fallback={<Loader/>}>
					<FridgeModel setUuid={setFridgeUuid}/>
					<TrashcanModel initialPosition={[-2.5, -1.5, 1]} setModels={setModels}/>
					<MBTIModel initialPosition={[2, 1.7, 0]} fridgeUuid={fridgeUuid} models={models} setModels={setModels}/>
					<Rig/>
					<Environment />
				</Suspense>
			</Canvas>
			<Box>
				<Button sx={{position: 'absolute', top: '90%', left: '90%', transform: 'translate(-50%, -50%)', padding: '20px'}} onClick={handleSave}>저장</Button>
			</Box>
		</Box>
	)
}

export default ModifyFridge;