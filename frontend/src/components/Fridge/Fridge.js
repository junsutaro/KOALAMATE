import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import FridgeModel from './FridgeModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';

function Fridge() {
	const directionalLightRef = useRef();

	useEffect(() => {
		if (directionalLightRef.current) {
			directionalLightRef.current.shadow.mapSize.width = 2048; // 그림자 맵의 너비 설정
			directionalLightRef.current.shadow.mapSize.height = 2048; // 그림자 맵의 높이 설정
		}
	}, []);

	return (
		<Box height='800px'>
			<Canvas camera={{ position: [0, 0, 6] }} shadows>
				<ambientLight intensity={1}/>
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={0.5}/>
				<directionalLight ref={directionalLightRef} position={[10, 10, 10]} intensity={1} castShadow/>
				<pointLight position={[5, 5, 5]}/>
				<FridgeModel />
				<MBTIModel initialPosition={[4, 2, 0]}/>
				<Rig/>
			</Canvas>
		</Box>
	)
}

export default Fridge;