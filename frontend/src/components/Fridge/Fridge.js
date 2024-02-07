import React, { Suspense, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import FridgeModel from './FridgeModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';
import Loader from './Loader';

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
				<ambientLight intensity={1}/>
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={0.5}/>
				<directionalLight ref={directionalLightRef} position={[10, 10, 10]} intensity={1} castShadow/>
				<pointLight position={[5, 5, 5]}/>
				<Suspense fallback={<Loader/>}>
					<FridgeModel setUuid={setFridgeUuid}/>
				</Suspense>
				<MBTIModel initialPosition={[3, 2, 0]} fridgeUuid={fridgeUuid}/>
				<Rig/>
			</Canvas>
		</Box>
	)
}

export default Fridge;