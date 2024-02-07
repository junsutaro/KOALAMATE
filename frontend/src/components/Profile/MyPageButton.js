import {Button, ButtonGroup} from '@mui/material';
import {NavLink} from 'react-router-dom';
import React from 'react';

const MyPageButton = ({userId}) => {

	return (
			<>
				<ButtonGroup variant="outlined" aria-label="outlined button group"
				             sx={{margin: '10px'}}>
					<Button component={NavLink} to={`/user/${userId}/update`}>프로필 수정</Button>
					<Button component={NavLink} to={`/user/${userId}`}>프로필</Button>
					<Button component={NavLink} to={`/user/${userId}/follower`}>팔로워</Button>
					<Button component={NavLink} to={`/user/${userId}/follower`}>팔로잉</Button>
				</ButtonGroup>
			</>
	);
};
export default MyPageButton;