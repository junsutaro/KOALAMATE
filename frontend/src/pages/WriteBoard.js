import React, { useState } from 'react';
import { Button, TextField, Typography, Box, TextareaAutosize } from '@mui/material';
import NoImage from 'assets/no_img.png'; // 'no_img.png' 이미지 경로 확인 필요

function BulletinBoard() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imagePreview, setImagePreview] = useState(NoImage);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

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

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Title:', title);
		console.log('Content:', content);
		// 이미지 데이터도 전송해야 합니다
	};

	return (
			<Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Typography variant="h5">게시판</Typography>
				<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
					<Box sx={{ width: '400px' }}>
						<img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', marginBottom: 8 }} />
						<Button variant="contained" component="label">
							이미지 업로드
							<input
									type="file"
									hidden
									onChange={handleImageChange}
									accept="image/*" // 모든 이미지 형식을 허용
							/>
						</Button>
						<Button variant="outlined" sx={{ mt: 1 }} onClick={handleCancelImage}>
							취소
						</Button>
					</Box>
					<Box sx={{ flex: 1 }}>
						<TextField label="제목" variant="outlined" fullWidth value={title} onChange={handleTitleChange} sx={{ mb: 2 }} />
						<TextareaAutosize
								minRows={6} // 초기 표시 행 수 증가
								style={{ width: '100%', height: '200px' }} // 너비와 높이 조정
								placeholder="내용"
								value={content}
								onChange={handleContentChange}
						/>
					</Box>
				</Box>
				<Button type="submit" variant="contained" color="primary" sx={{ mt: 2, alignSelf: 'flex-end' }}>게시글 올리기</Button>
			</Box>
	);
}

export default BulletinBoard;
