import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import TRASHCAN_URL from 'assets/trashcan.glb';

export default function TrashcanModel({initialPosition}) {
	const { scene } = useGLTF(TRASHCAN_URL);

	useEffect((initialPosition) => {
		console.log(scene);
		scene.traverse((obj) => {
			if (obj.isMesh) {
				obj.castShadow = true;
				obj.receiveShadow = true;
			}
		});
	}, []);

	return <primitive object={scene} position={initialPosition}/>;
}