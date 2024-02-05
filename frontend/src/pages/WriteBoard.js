import React, {useState} from 'react';
import {
	Button,
	TextField,
	Typography,
	Box,
	TextareaAutosize,
	IconButton, Grid,
} from '@mui/material';
import NoImage from 'assets/no_img.png'; // 'no_img.png' 이미지 경로 확인 필요
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTextareaAutosize from '../components/CustomTextareaAutosize';
import AddIngredient from "../components/AddIngredient";

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
			<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} mt={2}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
						>
							<Box sx={{ position: 'relative', width: '100%', maxWidth: '300px', mb: 1 }}>
								<img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px', border: '1px solid grey' }} />
								{imagePreview !== NoImage && (
										<IconButton
												aria-label="delete"
												sx={{ position: 'absolute', right: 0, bottom: 0, color: 'grey[900]', backgroundColor: 'lightgrey', borderRadius: '4px', margin: '0 4px 4px 0' }}
												onClick={handleCancelImage}
										>
											<DeleteIcon />
										</IconButton>
								)}
								<Button variant="contained" component="label" fullWidth>
									이미지 업로드
									<input type="file" hidden onChange={handleImageChange} accept="image/*" />
								</Button>
							</Box>
						</Box>

					</Grid>
					<Grid item xs={12} sm={8}>
						<TextField label="제목" variant="outlined" fullWidth value={title} onChange={handleTitleChange} sx={{ mb: 2 }} />
						<CustomTextareaAutosize
								minRows={12}
								placeholder="내용"
								value={content}
								onChange={handleContentChange}
						/>
						<AddIngredient />
						<Box display="flex" justifyContent="flex-end" mt={2}>
							<Button type="submit" variant="contained" color="primary">게시글 올리기</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
	);
}

export default BulletinBoard;
