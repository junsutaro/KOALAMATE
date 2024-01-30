import React from 'react';
import {Avatar, Typography, Box, Chip} from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1'; // Import the correct icon
import profileImg from 'assets/profile.jpg'; // 기본 프로필 이미지
import {useSelector} from 'react-redux';

const Profile = ({nickname}) => {
	return (
			<>
				<Box
						m={3}
						sx={{
							width: 300,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center', // Center items horizontally
							justifyContent: 'center', // Center items vertically
						}}
				>
					<Avatar sx={{width: 200, height: 200}} src={profileImg}/>

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
						<Chip label="연령대" variant="Filled"
						      sx={{backgroundColor: '#CDFAD5'}}/>
						<Chip label="성별" variant="Filled"
						      sx={{backgroundColor: '#FF9B9B'}}/>
					</div>

					<Box style={{
						display: 'flex',
						marginTop: '10px',
						marginBottom: '10px',
						// gap: 10,
					}}>
						<Box m={1} p={1} >팔로워 0</Box>
						<Box m={1} p={1}>팔로우 0</Box>
					</Box>

				</Box>
			</>
	)
			;
};

export default Profile;
