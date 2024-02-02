import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyPageButton from '../components/Profile/MyPageButton';
import Soju from 'assets/alcohol.png';
import SojuCup from 'assets/cup2.png';
import NoImage from 'assets/profile.jpg';
import {
	Typography,
	Box,
	Container,
	Chip,
	Button,
	IconButton,
	Avatar,
	TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';


const UpdateMyPage = () => {
	const { userId } = useParams();

	// state
	const [profileData, setProfileData] = useState({
		nickname: '',
		birthRange: 0,
		gender: '',
		profile: '', // 프로필 이미지 주소
		introduction: '',
		alcoholLimitBottle: 0,
		alcoholLimitGlass: 0,
		tags: [],
	});

	const [imagePreview, setImagePreview] = useState(NoImage);
	const [sojuBottleCount, setSojuBottleCount] = useState(0);
	const [sojuCupCount, setSojuCupCount] = useState(0);
	const [introduction, setIntroduction] = useState('');
	const [tagOptions, setTagOptions] = useState([
		'1~2명', '3~5명', '6~8명', '8~10명',
		'20대', '30대', '40대', '50대', '60대 이상',
		'직장인', '학생', '취준생', '주부', '홈 프로텍터',
		'남자만', '여자만', '남녀 모두',
	]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [addTag, setAddTag] = useState('');
	const [error, setError] = useState('');

	// userId가 바뀌면 user 프로필 정보를 가져오는 함수
	useEffect(() => {
		const getProfileData = async () => {
			try {
				const response = await axios.get(
						`http://localhost:8080/profile/${userId}`
				);
				const data = response.data;
				setProfileData({
					nickname: data.nickname || '',
					birthRange: data.birthRange || 0,
					gender: data.gender === '1' ? '여성' : '남성',
					profile: data.profile || '',
					introduction: data.introduction || '',
					alcoholLimitBottle: data.alcoholLimitBottle || 0,
					alcoholLimitGlass: data.alcoholLimitGlass || 0,
					tags: data.tags || [],
				});
				setSojuBottleCount(data.alcoholLimitBottle || 0);
				setSojuCupCount(data.alcoholLimitGlass || 0);
				setIntroduction(data.introduction || '');
				setSelectedTags(data.tags || []);
				setImagePreview(data.profile);
			} catch (error) {
				console.log('프로필 데이터를 가져오는 중 에러 발생: ', error);
			}
		};
		getProfileData();
	}, [userId]);


	// 프로필 이미지 변경 함수
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// 이미지 파일인지 확인
			if (!file.type.startsWith('image/')) {
				alert('이미지 파일만 업로드할 수 있습니다.');
				return;
			}

			const reader = new FileReader();
			reader.readAsArrayBuffer(file); // FileReader를 사용하여 ArrayBuffer로 읽어옴
			reader.onloadend = () => {
				const blob = new Blob([reader.result], { type: file.type });
				setImagePreview(blob);
			};
		}
	};

	// 프로필 기본 이미지로 초기화하는 함수
	const handleCancelImage = () => {
		setImagePreview(NoImage);
	};

	// 태그 선택 함수
	const handleTagClick = (clickTag) => {
		if (selectedTags.includes(clickTag)) {
			setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== clickTag));
		} else {
			setSelectedTags((prevTags) => [...prevTags, clickTag]);
		}
	};

	// 태그 렌더딩 함수
	const renderTags = () => {
		return (
				<Box
						sx={{
							display: 'flex',
							gap: 1,
							marginTop: 1,
							flexWrap: 'wrap',
						}}
				>
					{tagOptions.map((tag) => (
							<Chip
									key={tag}
									label={tag}
									variant="filled"
									onClick={() => handleTagClick(tag)}
									sx={{
										mr: 1,
										mb: 1,
										backgroundColor: selectedTags.includes(tag) ? '#ff9b9b' : undefined,
										color: selectedTags.includes(tag) ? '#fff' : undefined,
									}}
							/>
					))}
				</Box>
		);
	};

	// 태그 추가 버튼 클릭 함수 (클릭할 때마다 폼 표시 여부 토글)
	const handleAddButton = () => {
		setIsVisible(!isVisible);
	};

	const addTagOptions = () => {
		if (addTag.trim() !== '' && addTag.length <= 10) {
			if (!tagOptions.includes(addTag)) {
				const updatedTags = [...tagOptions, addTag];

				// 선택된 태그 업데이트
				setSelectedTags([...selectedTags, addTag]);

				// 상태 업데이트
				setTagOptions(updatedTags);
				setAddTag('');
				setError('');
			} else {
				setError('이미 존재하는 태그입니다.');
			}
		} else {
			setError('태그는 1자 이상 10자 이하로 작성해주세요.');
		}
	};

	// const saveProfile = async () => {
	// 	try {
	// 		const response = await axios.put(
	// 				`http://localhost:8080/profile/${userId}/modify`,
	// 				{
	// 					'modifiedProfile': {
	// 						nickname: profileData.nickname,
	// 						birthRange: profileData.ageRange,
	// 						gender: profileData.gender,
	// 						introduction: introduction,
	// 						alcoholLimitBottle: sojuBottleCount,
	// 						alcoholLimitGlass: sojuCupCount,
	// 						tags: selectedTags,
	// 					},
	// 					file: imagePreview,
	// 				});
	// 		console.log('프로필 저장 성공 :', response.data);
	// 	} catch (error) {
	// 		console.log(' 프로필 저장 중 에러 발생 : ', error);
	// 	}
	// };


	const convertToBlob = async (url) => {
		const response = await axios.get(url, { responseType: 'blob' });
		return response.data;
	};

	const saveProfile = async () => {
		try {
			const formData = new FormData();
			formData.append('file', imagePreview, 'profile-image.jpg');
			formData.append(
					'modifiedProfile',
					JSON.stringify({
						nickname: profileData.nickname,
						birthRange: profileData.birthRange,
						gender: profileData.gender,
						introduction: introduction,
						alcoholLimitBottle: sojuBottleCount,
						alcoholLimitGlass: sojuCupCount,
						tags: selectedTags,
					})
			);

			const response = await axios.put(
					`http://localhost:8080/profile/${userId}/modify`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
			);
			console.log('프로필 저장 성공:', response.data);
		} catch (error) {
			console.error('프로필 저장 중 에러 발생: ', error);
		}
	};



	console.log(`nickname: ${profileData.nickname}`)
	console.log(`birthRange: ${profileData.birthRange}`)
	console.log(`gender: ${profileData.gender}`)
	console.log(`introduction: ${introduction}`)
	console.log(`sojuBottleCount: ${sojuBottleCount}`)
	console.log(`sojuCupCount: ${sojuCupCount}`)
	console.log(`selectedTags: ${selectedTags}`)
	console.log(`imagePreview: ${imagePreview}`)

	return (
			<Container component="form">
				<MyPageButton/>
				{/*<img src={NoImage} alt=""/>*/}
				<img src={`${profileData.profile}`}
				     alt=""/>

				<p>{`${profileData.profile}`}</p>
				<Box
						sx={{
							display: 'flex',
							gap: 4,
						}}
				>
					<>
						<Box
								m={3}
								sx={{
									width: 300,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}
						>
							<Avatar
									sx={{
										width: 200,
										height: 200,
										borderRadius: '50%',
										mb: 1,
									}}
									// src={imagePreview !== NoImage ? imagePreview : NoImage}
									src={profileData.profile}
									alt="Preview"
							/>

							<Box sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								width: '100%',
							}}>
								<Button variant="contained" component="label" fullWidth>
									프로필 이미지 변경
									<input type="file" hidden onChange={handleImageChange}
									       accept="image/*"/>
								</Button>
								{imagePreview !== NoImage && (
										<IconButton
												aria-label="delete"
												sx={{
													color: 'grey[900]',
													backgroundColor: 'lightgrey',
													borderRadius: '4px',
													margin: '0 4px 4px 0',
												}}
												onClick={handleCancelImage}
										>
											<DeleteIcon/>
										</IconButton>
								)}
							</Box>

							<Box m={3}
							     sx={{
								     display: 'flex',
								     flexDirection: 'column',
								     alignItems: 'center',
								     justifyContent: 'center',
							     }}
							>
								<Typography sx={{fontWeight: 'bold'}} variant="h5">
									{profileData.nickname}
								</Typography>

								<div style={{display: 'flex', marginTop: '10px', gap: 10}}>
									<Chip label={`${profileData.birthRange}대`} variant="Filled"
									      sx={{backgroundColor: '#CDFAD5'}}/>
									<Chip label={profileData.gender} variant="Filled"
									      sx={{backgroundColor: '#FF9B9B'}}/>
								</div>
							</Box>
						</Box>
					</>

					<Box sx={{display: 'flex', flexDirection: 'column'}}>
						<Box margin="20px 0px 5px 0px" sx={{display: 'flex', gap: 1}}>
							<Typography
									sx={{fontWeight: 'bold'}}
									variant="h6"
							>
								주량 입력하기
							</Typography>
							<Typography fontSize="12px"
							            sx={{marginTop: 1, color: 'gray'}}>:</Typography>
							<Typography fontSize="12px" sx={{marginTop: 1, color: 'gray'}}>주량
								작성 ex)</Typography>
							<Typography fontSize="12px" sx={{marginTop: 1, color: 'gray'}}>소주
								2병 3잔, </Typography>
							<Typography fontSize="12px" sx={{marginTop: 1, color: 'gray'}}>소주
								0병 1잔</Typography>
						</Box>
						<Box sx={{display: 'flex'}}>
							<Box>
								<img
										src={Soju}
										width="30"
								/>
								<TextField
										sx={{marginTop: 4, marginX: 3}}
										type="number"
										label="소주 병 수"
										value={sojuBottleCount}
										onChange={(e) => setSojuBottleCount(Number(e.target.value))}
								/>
							</Box>

							<Box>
								<img
										src={SojuCup}
										width="30"
								/>
								<TextField
										sx={{marginTop: 4, marginX: 3}}
										type="number"
										label="소주 잔 수"
										value={sojuCupCount}
										onChange={(e) => setSojuCupCount(Number(e.target.value))}
								/>
							</Box>
						</Box>
						<Box>
							<TextField
									sx={{marginTop: 2, width: 600}}
									type="string"
									label="TMI"
									placeholder={`${profileData.nickname}님을 나타낼 수 있는 한 줄 소개를 작성해주세요`}
									value={introduction}
									onChange={(e) => setIntroduction((e.target.value))}
							/>
						</Box>

						<Box>
							<Typography
									mt={3}
									mb={2}
									sx={{fontWeight: 'bold'}}
									variant="h6"
							>
								선호하는 모임 태그 선택하기
							</Typography>
							<Box sx={{
								display: 'flex',
								gap: 1,
								marginTop: 1,
							}}>{renderTags()}</Box>

							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
							}}>
								<Button onClick={handleAddButton}>
									<AddBoxIcon sx={{fontSize: '50px', color: '#ff9b9b'}}/>
								</Button>
								{isVisible && (
										<Box>
											<TextField
													sx={{marginTop: 2, width: 600}}
													label="태그 추가하기"
													placeholder="추가하고 싶은 모임 태그를 작성해주세요"
													value={addTag}
													onChange={(e) => setAddTag(e.target.value)}
											/>
											<Button onClick={addTagOptions}
											        sx={{
												        marginTop: 2,
												        backgroundColor: '#ff9b9b',
												        color: 'white',
												        fontWeight: 'bold',
												        borderRadius: '5px',
												        padding: '15px',
												        '&:hover': {
													        backgroundColor: '#ff7f7f',
												        },
											        }}
											>추가</Button>
											{error && (
													<Typography
															sx={{color: 'red', marginTop: 1}}
															variant="body2"
													>
														{error}
													</Typography>
											)}
										</Box>
								)}
							</Box>


						</Box>
					</Box>

				</Box>

				<Button
						fullWidth
						sx={{
							marginTop: 2,
							backgroundColor: '#ff9b9b',
							color: 'white',
							fontWeight: 'bold',
							borderRadius: '5px',
							padding: '15px',
							'&:hover': {
								backgroundColor: '#ff7f7f',
							},
						}}
						onClick={saveProfile}
				>프로필 저장하기</Button>
			</Container>
	);
};

export default UpdateMyPage;
