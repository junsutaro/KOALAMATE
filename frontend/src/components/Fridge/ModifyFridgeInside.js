import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber';
import FridgeInsideModel from './FridgeInsideModel';
import Rig from './Rig';
import MBTIModel from './MBTIModel';
import * as THREE from 'three';
import Loader from './Loader';
import TrashcanModel from './TrashcanModel';
import ENV_URL from 'assets/brown_photostudio_02_4k.exr';
import {EXRLoader} from 'three/examples/jsm/loaders/EXRLoader';
import {Html, OrbitControls} from '@react-three/drei';
import {useWebSocket} from '../../context/WebSocketContext';
import AddButtonModel from "./addButtonModel";
import axios from "axios";
import BottleModel from "./BottleModel";

function Environment() {
    const {scene} = useThree();
    const exrTexture = useLoader(EXRLoader, ENV_URL);


    useEffect(() => {

        exrTexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = exrTexture;
    }, [exrTexture, scene]);

    return null;
}

const CameraControl = ({ cell, setCell }) => {
    const camera = useThree((state) => state.camera);

    useEffect(() => {
        camera.rotation.set(-0.5, 0, 0);
    })

    useFrame(() => {
        // 카메라의 Y 위치를 조정하여 '올라가기'와 '내려가기' 기능을 구현합니다.
        camera.position.y = 1.5 - cell; // 여기서 cell 값에 따라 카메라의 Y 위치를 조정합니다.
    });

    // HTML 요소를 3D 캔버스 외부에 배치하여 화면에 고정되도록 합니다.
    return null; // HTML 요소는 이 컴포넌트 밖에서 직접 렌더링합니다.
};

function ModifyFridge() {
    const pointLightRef = useRef();
    const [fridgeUuid, setFridgeUuid] = React.useState(null);
    const {roomStatus} = useWebSocket();
    const [models, setModels] = useState([]);
    const [cell, setCell] = useState(0);
    const [drinks, setDrinks] = useState([]);
    const [showAddDrinkUI, setShowAddDrinkUI] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDrink, setSelectedDrink] = useState(null);

    const category = ['Gin', 'Rum', 'Vodka', 'Whiskey', 'Tequila', 'Brandy', 'Liqueur', 'Beer', 'Soju'];

    useEffect(() => {
        console.log(roomStatus);
        console.log(pointLightRef.current);
        if (pointLightRef.current) {
            console.log(pointLightRef.current);
            pointLightRef.current.shadow.mapSize.width = 2048; // 그림자 맵의 너비 설정
            pointLightRef.current.shadow.mapSize.height = 2048; // 그림자 맵의 높이 설정
        }
    }, [pointLightRef]);

    useEffect(() => {
        if (!selectedCategory) return;
        const categoryIndex = category.findIndex(c => c === selectedCategory);
        const categoryId = categoryIndex + 1;
        axios.post(`${process.env.REACT_APP_API_URL}/drink/search/category`, categoryId,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setDrinks(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [selectedCategory])

    const handleAddClick = () => {
        setShowAddDrinkUI(true);
    }

    const renderAddDrinkUI = () => {
        if (!showAddDrinkUI) return null;

        return (
            <Box sx={{width: '300px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">카테고리</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    label="카테고리"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                    {category.map((c, index) => <MenuItem key={index} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="drink-select-label">술</InputLabel>
                <Select
                    labelId="drink-select-label"
                    id="drink-select"
                    value={selectedDrink}
                    label="술"
                    onChange={(e) => setSelectedDrink(e.target.value)}
                    >
                    {drinks.map((drink) => <MenuItem key={drink.id} value={drink.id}>{drink.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Button onClick={() => {
                setModels([...models, selectedDrink]);
            }}>추가하기</Button>
            <Button onClick={() => {
                setShowAddDrinkUI(false);
                setSelectedCategory(null);
                setSelectedDrink(null);
            }}>취소</Button>
            </Box>
            // <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px'}}>
            //     <h2>음료 추가하기</h2>
            //     <input type='text' placeholder='음료 이름' />
            //     <input type='number' placeholder='음료 가격' />
            //     <Button>추가하기</Button>
            //     <Button onClick={() => {setShowAddDrinkUI(false)}}>취소</Button>
            // </Box>
        )
    }

    return (
        <>
            <Box height='800px'>
                <Canvas camera={{position: [0, 0, 0.5], fov: 60}} shadows antialias='true' colorManagement={true}
                        shadowMap={{type: THREE.VSMShadowMap}}>
                    <OrbitControls />
                    {/*<ambientLight intensity={0.5}/>*/}
                    {/*<spotLight position={[-3, 3, 3]} angle={0.15} penumbra={0.5} castShadow/>*/}
                    {/*<directionalLight ref={directionalLightRef} position={[10, 5, 5]} intensity={5} castShadow/>*/}
                    <pointLight ref={pointLightRef} position={[5, 5, 5]} intensity={100} castShadow/>
                    <Suspense fallback={<Loader/>}>
                        <FridgeInsideModel setUuid={setFridgeUuid}/>
                        <AddButtonModel models={models} onAddClick={handleAddClick}/>
                        <BottleModel models={models}/>
                        {/*<Rig/>*/}
                        <Environment/>
                    </Suspense>
                    {/*<CameraControl cell={cell} setCell={setCell}/>*/}
                </Canvas>
            </Box>
            {renderAddDrinkUI()}
            <Box>
                {cell > 0 &&
                    <Button sx={{position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px'}} onClick={() => setCell(cell - 1)}>올라가기</Button>
                }
                {cell < 3 &&
                    <Button sx={{position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px'}} onClick={() => setCell(cell + 1)}>내려가기</Button>
                }
            </Box>
        </>
    )
}

export default ModifyFridge;