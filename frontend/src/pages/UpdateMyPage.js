import React, { useState } from 'react';
import Soju from 'assets/alcohol.png';
import {
	Typography,
	Box,
	Container,
	Chip,
	ButtonGroup,
	Button,
	IconButton,
	Avatar,
} from '@mui/material';
import NoImage from '../assets/profile.jpg';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateMyPage = () => {
	const userNickname = '글라스 오함마';
	const alcoholLimit = 7;
	const [imagePreview, setImagePreview] = useState(NoImage);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// 이미지 파일인지 확인
			if (!file.type.startsWith('image/')) {
				alert('이미지 파일만 업로드할 수 있습니다.');
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
		}
	};

	const handleCancelImage = () => {
		setImagePreview(NoImage);
	};

	return (
			<Container component="form">
				<ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ margin: '10px' }}>
					<Button variant="contained">프로필 수정</Button>
					<Button>회원정보 수정</Button>
					<Button>팔로우/팔로잉</Button>
				</ButtonGroup>

				<Box
						p={3}
						sx={{
							border: 1,
							display: 'flex',
							borderColor: 'grey.500',
							borderRadius: '10px',
							flexDirection: 'row',
							gap: 10,
							'@media (max-width: 700px)': {
								flexDirection: 'column',
							},
						}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Avatar
								sx={{
									width: 200,
									height: 200,
									borderRadius: '50%',
									mb: 1,
								}}
								src={imagePreview !== NoImage ? imagePreview : NoImage}
								alt="Preview"
						/>

						<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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
										<DeleteIcon />
									</IconButton>
							)}

							<Button variant="contained" component="label" fullWidth>
								프로필 이미지 변경
								<input type="file" hidden onChange={handleImageChange} accept="image/*" />
							</Button>
						</Box>

						<Box m={3}>
							<Typography sx={{ fontWeight: 'bold' }} variant="h5">
								{userNickname}
							</Typography>

							<div style={{ display: 'flex', marginTop: '10px', gap: 10 }}>
								<Chip label="연령대" variant="Filled" sx={{ backgroundColor: '#CDFAD5' }} />
								<Chip label="성별" variant="Filled" sx={{ backgroundColor: '#FF9B9B' }} />
							</div>
						</Box>

						{/* ProfileData 컴포넌트 추가 */}
						{/* <ProfileData limit={alcoholLimit} /> */}
					</Box>

					<Box sx={{ display: 'flex', height: 100, gap: 5, marginTop: 1 }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography sx={{ fontWeight: 'bold', marginBottom: 2 }} variant="h6">
								주량
							</Typography>
							<img src={Soju} alt={`Soju Image`} width={30} />
						</Box>
						<Box mt={3}>
							<Box m={1} sx={{ display: 'flex', flexDirection: 'column' }}>
								<label>소주 주량 입력하기</label>
								<div>
									<input></input>
									<button>입력</button>
								</div>
							</Box>

							<Box m={1} sx={{ display: 'flex', flexDirection: 'column' }}>
								<label>주량에 대한 TMI</label>
								<div>
									<input></input>
									<button>입력</button>
								</div>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
	);
};

export default UpdateMyPage;
