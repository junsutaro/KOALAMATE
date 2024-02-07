import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import I_URL from 'assets/I.glb';
import N_URL from 'assets/N.glb';
import F_URL from 'assets/F.glb';
import P_URL from 'assets/P.glb';
import E_URL from 'assets/E.glb';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function MBTIModel ({ initialPosition }) {
	const { camera, pointer, scene } = useThree();
	const [models, setModels] = useState([]);
	const [draggedModel, setDraggedModel] = useState(null);

	const { scene: I_scene } = useGLTF(I_URL);
	const { scene: N_scene } = useGLTF(N_URL);
	const { scene: F_scene } = useGLTF(F_URL);
	const { scene: P_scene } = useGLTF(P_URL);
	const { scene: E_scene } = useGLTF(E_URL);

	const onModelClick = (modelScene, index) => {
		console.log('model clicked');
		if (!modelScene) {
			console.log('Model is not loaded yet');
			return;
		}
		const existingModel = models.find(model => model.object.uuid === modelScene.uuid);
		if (existingModel) {
			setDraggedModel({...existingModel, isNew: false});
		} else {
			setDraggedModel({
				object: modelScene.clone(),
				index: index,
				position: [initialPosition.x, initialPosition.y, 1.4],
				isNew: true,
			});
		}

	};

	useEffect(() => {
		const handlePointerDown = (event) => {
			const raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(pointer, camera);
			const intersects = raycaster.intersectObjects(scene.children, true);

			if (intersects.length > 0) {
				const firstIntersectedObject = intersects[0].object;

				// 이미 배치된 모델을 찾아서 드래그 중인 모델로 설정합니다.
				const existingModel = models.find(model => model.object.uuid === firstIntersectedObject.uuid);
				if (existingModel) {
					setDraggedModel({...existingModel, isNew: false});
				} else {
					// 새로운 모델을 복제하여 드래그하는 경우
					const clonedObject = firstIntersectedObject.clone();
					scene.add(clonedObject);
					setDraggedModel({
						object: clonedObject,
						position: [initialPosition.x, initialPosition.y, 1.4],
						isNew: true
					});

				}
			}
	};
		window.addEventListener('pointerdown', handlePointerDown);

		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [models, pointer, camera, scene.children]);

	useFrame(() => {
		if (draggedModel) {
			const normalizedPosition = new THREE.Vector3(pointer.x, pointer.y, 0.5);
			const worldPosition = normalizedPosition.unproject(camera);
			const dir = worldPosition.sub(camera.position).normalize();
			const distance = (1.4 - camera.position.z) / dir.z;
			const finalPosition = camera.position.clone().add(dir.multiplyScalar(distance));
			// const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
			// vector.unproject(camera);
			// const dir = vector.sub(camera.position).normalize();
			// const distance = -camera.position.z / dir.z;
			// const pos = camera.position.clone().add(dir.multiplyScalar(distance));

			// const newPosition = [finalPosition.x, finalPosition.y, draggedModel.position[2]];
			//
			// setDraggedModel({
			// 	...draggedModel,
			// 	position: newPosition,
			// });

			draggedModel.object.position.set(finalPosition.x, finalPosition.y, 1.4);
		}
	});

	useEffect(() => {
		const handlePointerUp = () => {
			if (draggedModel) {
				if (draggedModel.isNew) {
					setModels([...models, {
						object: draggedModel.object,
						position: draggedModel.object.position.toArray()
					}]);
				} else {
					// 드래그가 완료되면 모델의 위치를 업데이트합니다.
					setModels(models.map(model =>
						model.object.uuid === draggedModel.object.uuid
							? { ...model, position: draggedModel.object.position.toArray() }
							: model
					));
				}
				setDraggedModel(null);
				// 드래그가 완료되면 모델의 위치를 업데이트합니다.
				// setModels(models.map(model => model.object.uuid === draggedModel.object.uuid ? { ...model, position: draggedModel.object.position.toArray() } : model));
				// setDraggedModel(null);
			}
			// if (draggedModel) {
			// 	console.log(draggedModel);
			// 	setModels([...models, draggedModel]);
			// 	setDraggedModel(null);
			// }
		};
		window.addEventListener('pointerup', handlePointerUp);

		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
		};
	}, [draggedModel, models]);

	return (
		<>
			<group position={initialPosition}>
				<primitive object={I_scene} position={[0, 0, 1.4]}
				           onPointerDown={() => onModelClick(I_scene)}/>
				<primitive object={N_scene} position={[0, -1, 1.4]}
				           onPointerDown={() => onModelClick(N_scene)}/>
				<primitive object={F_scene} position={[0, -2, 1.4]}
				           onPointerDown={() => onModelClick(F_scene)}/>
				<primitive object={P_scene} position={[0, -3, 1.4]}
				           onPointerDown={() => onModelClick(P_scene)}/>
				<primitive object={E_scene} position={[0, -4, 1.4]}
				           onPointerDown={() => onModelClick(E_scene)}/>
			</group>
			{models.map((model, index) => (
				<primitive object={model.object} key={index} position={model.position}/>
			))}
			{draggedModel && (
				<primitive object={draggedModel.object} position={draggedModel.position}/>
			)}
		</>
	);
}