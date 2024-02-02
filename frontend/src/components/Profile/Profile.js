import React from 'react';
import {Avatar, Typography, Box, Chip, Button} from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1'; // Import the correct icon
import standardImg from 'assets/profile.jpg'; // 기본 프로필 이미지
import {NavLink} from 'react-router-dom';

const Profile = ({img, nickname, gender, age, follower, followee}) => {

	const followerCnt = follower.cnt;
	const followeeCnt = followee.cnt;

	return (
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
					<Avatar sx={{width: 200, height: 200}}
					        src={img | standardImg}/>

					<div style={{
						display: 'flex',
						alignItems: 'center',
						marginTop: '20px',
					}}>
						<Brightness1Icon sx={{
							marginRight: '5px',
							width: 10,
							height: 10,
							color: '#00a152',
						}}/>
						{/*<Typography variant="h5">{userNickname}</Typography>*/}
						<Typography sx={{fontWeight: 'bold'}}
						            variant="h5">{nickname}</Typography>
					</div>

					<div style={{display: 'flex', marginTop: '10px', gap: 10}}>
						<Chip  label={`${age}대`} variant="Filled"
						      sx={{backgroundColor: '#CDFAD5'}}/>
						<Chip label={gender} variant="Filled"
						      sx={{backgroundColor: '#FF9B9B'}}/>
					</div>

					<Box style={{
						display: 'flex',
						marginTop: '10px',
						marginBottom: '10px',
						// gap: 10,
					}}>

						<Button m={1} p={1} component={NavLink}
						        to="/user/2/follower">팔로워 {followerCnt}</Button>
						<Button m={1} p={1} component={NavLink}
						        to="/user/2/followee">팔로우 {followeeCnt}</Button>

					</Box>

				</Box>
			</>
	)
			;
};

export default Profile;
