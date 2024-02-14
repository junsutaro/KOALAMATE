import React, {useEffect} from 'react';
import { useGLTF } from '@react-three/drei';
import BOTTLE_URL from 'assets/bottle.glb';
import CAN_URL from 'assets/can.glb';

const BottleModel = ({ models, onBottleClick, selectedCategory, setSelectedCategory }) => {
    const { scene: bottleScene } = useGLTF(BOTTLE_URL);
    const { scene: canScene } = useGLTF(CAN_URL);

    // useEffect(() => {
    //     scene.traverse((child) => {
    //         if (child.isMesh) {
    //             // child.castShadow = true;
    //             // child.receiveShadow = true;
    //             // 투명한 객체인 경우 renderOrder를 조정
    //             if (child.material.transparent) {
    //                 child.renderOrder = 2;
    //             }
    //         }
    //     });
    // }, [models]);

    return (
        <>
            {models.map((model, index) => {
                // 모델의 행(row)과 열(column) 계산
                const row = Math.floor(index / 4); // 인덱스를 4로 나눈 몫
                const column = index % 4; // 인덱스를 4로 나눈 나머지

                // 모델의 위치 계산 (예시 값, 필요에 따라 조정)
                const position = [column * 0.45 - 0.7, row * -0.86 + 1.3, -0.6]; // X, Y, Z 위치

                if (selectedCategory === 'Beer') {
                    return (
                        <primitive key={index} object={canScene.clone()} position={position} scale={[0.1, 0.1, 0.1]} onClick={() => onBottleClick(index)}
                                   onPointerOver={() => (document.body.style.cursor = 'pointer')}
                                   onPointerOut={() => (document.body.style.cursor = 'auto')}
                        />
                    );
                }
                else {
                    return (
                        <primitive key={index} object={bottleScene.clone()} position={position} scale={[0.1, 0.1, 0.1]} onClick={() => onBottleClick(index)}
                                   onPointerOver={() => (document.body.style.cursor = 'pointer')}
                                   onPointerOut={() => (document.body.style.cursor = 'auto')}
                        />
                    );
                }
            })}
        </>
    );
}

export default BottleModel;