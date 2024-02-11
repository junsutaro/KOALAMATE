import React, {Suspense, useEffect, useRef, useState} from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import FridgeInsideModel from './FridgeInsideModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';
import Loader from './Loader';
import TrashcanModel from './TrashcanModel';
import ENV_URL from 'assets/brown_photostudio_02_4k.exr';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { OrbitControls } from '@react-three/drei';
import { useWebSocket } from '../../context/WebSocketContext';

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
				<OrbitControls />
				{/*<ambientLight intensity={0.5}/>*/}
				{/*<spotLight position={[-3, 3, 3]} angle={0.15} penumbra={0.5} castShadow/>*/}
				{/*<directionalLight ref={directionalLightRef} position={[10, 5, 5]} intensity={5} castShadow/>*/}
				<pointLight ref={pointLightRef} position={[5, 5, 5]} intensity={100} castShadow/>
				<Suspense fallback={<Loader/>}>
					<FridgeInsideModel setUuid={setFridgeUuid}/>
					<TrashcanModel initialPosition={[-2.5, -1.5, 1]} setModels={setModels}/>
					<MBTIModel initialPosition={[2, 1.7, 0]} fridgeUuid={fridgeUuid} models={models} setModels={setModels}/>
					{/*<Rig/>*/}
					<Environment />
				</Suspense>
			</Canvas>
		</Box>
	)
}

export default ModifyFridge;