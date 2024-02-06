import React, { useState } from 'react';
import { ListItem, Typography, Button, Grid,TextField  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {useSelector} from 'react-redux';
import {format} from "date-fns";

const CommentItem = ({ comment, onDeleteComment, onEditComment,  handleEditComment  }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedContent, setEditedContent] = useState(comment.content)


	// 현재 로그인한 사용자가 댓글 작성자인지 확인하는 부분
	const isCommentAuthor = useSelector(state => state.auth.user?.nickname === comment.nickname);

	// 수정
	const handleEditClick = () => {
		setIsEditing(true)
		onEditComment(comment.id, editedContent);  // 수정 중인 댓글의 ID와 내용 전달
		console.log(comment.id, editedContent)
	}

	// 수정 저장
	const handleSaveClick = () => {
		onEditComment(comment.id, editedContent) // 수정된 내용으로 바꾸기
		setIsEditing(false)                // 수정 상태에서 나가기
		console.log(isEditing)
		console.log(comment.id, editedContent)
	}

	// 수정 취소
	const handleCancelClick = () => {
		setIsEditing(false)            // 수정 상태에서 나가기
		setEditedContent(comment.content)    // 원래 댓글로 초기화
	}

	return (
			<ListItem
					sx={{
						border: '1px solid #ddd',
						margin: '10px',
						padding: '10px',
						display: 'flex',
						justifyContent: 'space-between',
					}}
			>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						{isEditing ? (
								<TextField
										value={editedContent}
										onChange={(e) => setEditedContent(e.target.value)}
										fullWidth
										multiline
										rows={2}
								/>
						) : (
								<>
									<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
										{comment.nickname}
									</Typography>
									<Typography variant="body1" sx={{ marginBottom: '10px' }}>
										{comment.content}
									</Typography>
									<Typography variant="body2" sx={{ color: '#888' }}>
										{format(new Date(comment.date), 'yyyy년 MM월 dd일 HH:mm:ss')}
									</Typography>
								</>
						)}
					</Grid>
					<Grid
							item
							xs={4}
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'flex-start',
							}}
					>
						{isEditing ? (
								<>
									<Button
											onClick={handleSaveClick}
											variant="contained"
											startIcon={<SaveIcon />}
											sx={{ marginTop: '10px', marginRight: '5px' }}
									>
										저장
									</Button>
									<Button
											onClick={handleCancelClick}
											variant="contained"
											color='error'
											startIcon={<CancelIcon />}
											sx={{ marginTop: '10px' }}
									>
										취소
									</Button>
								</>
						) : (
								<>
									{isCommentAuthor && (
											<>
												<Button
														onClick={() => onDeleteComment(comment.id)}
														variant="contained"
														color="error"
														sx={{ marginTop: '10px', marginRight: '5px' }}
												>
													삭제
												</Button>
												<Button
														onClick={() => handleEditClick(comment.id, editedContent)}
														variant="contained"
														sx={{ marginTop: '10px' }}
												>
													수정
												</Button>
											</>
									)}
								</>
						)}
					</Grid>
				</Grid>
			</ListItem>
	);
};

export default CommentItem;
