import React, { Suspense, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import FridgeModel from './FridgeModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';
import Loader from './Loader';
import TrashcanModel from './TrashcanModel';
import ENV_URL from 'assets/brown_photostudio_02_4k.exr';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

function Environment() {
	const { scene } = useThree();
	const exrTexture = useLoader(EXRLoader, ENV_URL);

	useEffect(() => {
		exrTexture.mapping = THREE.EquirectangularReflectionMapping;
		scene.environment = exrTexture;
	}, [exrTexture, scene]);

	return null;
}

function Fridge() {
	const directionalLightRef = useRef();
	const [fridgeUuid, setFridgeUuid] = React.useState(null);

	useEffect(() => {
		if (directionalLightRef.current) {
			directionalLightRef.current.shadow.mapSize.width = 2048; // 그림자 맵의 너비 설정
			directionalLightRef.current.shadow.mapSize.height = 2048; // 그림자 맵의 높이 설정
		}
	}, []);

	return (
		<Box height='800px'>
			<Canvas camera={{ position: [0, 0, 6] }} shadows>
				{/*<ambientLight intensity={0.5}/>*/}
				{/*<spotLight position={[-3, 3, 3]} angle={0.15} penumbra={0.5} castShadow/>*/}
				<directionalLight ref={directionalLightRef} position={[10, 10, 10]} intensity={1} castShadow/>
				{/*<pointLight position={[5, 5, 5]}/>*/}
				<Suspense fallback={<Loader/>}>
					<FridgeModel setUuid={setFridgeUuid}/>
					<TrashcanModel initialPosition={[-3, -1, 0]} />
					<MBTIModel initialPosition={[3, 2, 0]} fridgeUuid={fridgeUuid}/>
					<Rig/>
					<Environment />
				</Suspense>
			</Canvas>
		</Box>
	)
}

export default Fridge;