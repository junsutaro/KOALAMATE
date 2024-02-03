import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {AnimationMixer, LoopRepeat, LoopOnce } from 'three';

import refrigerator from 'assets/refrigerator.glb';

function GLBLoaderComponent() {
	const mountRef = React.useRef(null);
	const gltfRef = React.useRef(null);
	const mixerRef = React.useRef(null);
	const  actionRef = React.useRef(null);
	const cameraRef = React.useRef(null);

	const clock = new THREE.Clock();
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	useEffect(() => {
		const currentMount = mountRef.current;
		const scene = new THREE.Scene();
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		currentMount.appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
		cameraRef.current = camera;
		camera.position.set(10, 0.5, 0);
		camera.lookAt(0, 0.5, 0);

		const loader = new GLTFLoader();
		loader.load(refrigerator, function (gltf) {
			gltfRef.current = gltf;
			scene.add(gltf.scene);

			const mixer = new AnimationMixer(gltf.scene);
			mixerRef.current = mixer;

			if (gltf.animations.length > 0) {
				const action = mixer.clipAction(gltf.animations[0]);
				action.setLoop(LoopRepeat);
				actionRef.current = action;
			}

			if (gltf.scenes && gltf.scenes.length > 0) {
				gltf.scenes.forEach((scene) => {
					scene.traverse((node) => {
						if (node.isLight) {
							console.log(node);
							node.intensity *= 0.07;
							scene.add(node);
						}
					});
				});
			}
		});

		const onMouseClick = (event) => {

			if (!gltfRef.current) return;

			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(gltfRef.current.scene.children, true);

			if (intersects.length > 0) {
				intersects[0].object.material.color.set((Math.random() * 0xffffff));
			}

			if (gltfRef.current.animations.length === 1) {
				actionRef.current = mixerRef.current.clipAction(gltfRef.current.animations[0]);
				actionRef.current.setLoop(LoopOnce);
			}
			console.log(actionRef.current);
			actionRef.current.stop();
			actionRef.current.play();
		};
		window.addEventListener('mousedown', onMouseClick, false);

		const onRightClick = (event) => {
			event.preventDefault();
			console.log(gltfRef.current);

			let newColorValue = Math.random() * 0xffffff;
			gltfRef.current.scene.traverse(function (object) {
				if (object.isMesh && object.name.includes('Fridge')) {
					object.material.color.set(newColorValue);
				}
			})
		}
		window.addEventListener('contextmenu', onRightClick, false);

		function onMouseMove(event) {
			// 화면 중앙을 기준으로 마우스 위치 정규화
			const mouseZ = (event.clientX / window.innerWidth) * 2 - 1;
			const mouseY = 0.5 -(event.clientY / window.innerHeight) * 2 + 1;

			// 카메라 위치 조정 (마우스 위치에 따라)
			camera.position.z = -mouseZ * 2; // 조정 범위와 값은 필요에 따라 변경
			camera.position.y = mouseY * 2;

			// 카메라가 바라보는 방향 조정 (마우스 위치에 따라)
			camera.lookAt(0, 0.5, 0);
			console.log(camera.position.z, camera.position.y)
		}
		window.addEventListener('mousemove', onMouseMove, false);

		// 화면 크기가 변경될 때 Three.js 렌더러를 다시 계산하여 렌더링
		const onWindowResize = () => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;

			renderer.setSize(newWidth, newHeight);
			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
		};
		window.addEventListener('resize', onWindowResize);

		const animate = () => {
			requestAnimationFrame(animate);
			const delta = clock.getDelta();
			if (mixerRef.current)
				mixerRef.current.update(delta);
			renderer.render(scene, camera);
		};
		animate();

		return () => {
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mousedown', onMouseClick);
			window.removeEventListener('contextmenu', onRightClick);
			currentMount.removeChild(renderer.domElement);
			renderer.dispose();
			// 여기에 추가적인 정리 코드
		};
	}, []);



	return <div ref={mountRef}></div>
}

export default GLBLoaderComponent;