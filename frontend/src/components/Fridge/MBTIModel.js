import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import I_URL from 'assets/I.glb';
import N_URL from 'assets/N.glb';

export default function MBTIModel () {
	const { scene: I_scene } = useGLTF(I_URL);
	const { scene: N_scene } = useGLTF(N_URL);
	return (
		<group>
			<primitive object={I_scene} position={[0.3, 0, 1.4]}/>
			<primitive object={N_scene} position={[-0.3, 0, 1.4]}/>
		</group>
	);
}