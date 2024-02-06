import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import FRIDGE_URL from 'assets/refrigerator.glb';

export default function FridgeModel() {
	const { scene } = useGLTF(FRIDGE_URL);

	useEffect(() => {
		scene.traverse((obj) => {
			if (obj.isMesh) {
				obj.castShadow = true;
				obj.receiveShadow = true;
			}
		});
	}, []);

	return <primitive object={scene}/>;
}