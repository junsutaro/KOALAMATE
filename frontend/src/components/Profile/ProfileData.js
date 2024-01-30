import {Box, Chip, Container, Typography} from '@mui/material';
import Soju from '../../assets/alcohol.png';
import React, {useEffect, useState} from 'react';

const ProfileData = ({limit}) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);


	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);


	return (<Container>
		<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: windowWidth > 800 ? 5 : 1,
					width: '100%',
					'@media (max-width: 700px)': {
						flexDirection: 'column',
					},
				}}
		>
			<Box>
				<Typography sx={{fontWeight: 'bold', marginBottom:2}} variant="h5">
					주량
				</Typography>
				{/* 입력받은 숫자만큼 렌더링 */}

				{Array.from({length: limit}, (_, index) => (
						<img
								key={index}
								src={Soju}
								alt={`Soju Image ${index + 1}`}
								width={windowWidth > 800 ? 25 : 20}
						/>
				))}
			</Box>
			<Box>
				<p>주량 TMI: 한 잔만 마셔도 얼굴은 빨개지지만 취한 거 아님 </p>
				<Typography sx={{fontWeight: 'bold', color: '#00a152'}}
				            variant="h4">
					소주 {limit}병
				</Typography>
			</Box>
		</Box>
		<Box sx={{marginTop: 10}}>
			<Typography sx={{fontWeight: 'bold'}} variant="h5">
				선호하는 모임
			</Typography>
			<Box sx={{display: 'flex', gap: 2, marginTop:2}}>
				<Chip label="3~5명" variant="Filled"/>
				<Chip label="남 + 여" variant="Filled"/>
				<Chip label="20대" variant="Filled"/>
				<Chip label="30대" variant="Filled"/>
				<Chip label="직장인" variant="Filled"/>
			</Box>
		</Box>
		<Box sx={{marginTop: 10, display:'flex', gap:5}}>
			<Typography sx={{fontWeight: 'bold'}} variant="h5">
				당근 온도
			</Typography>
			<Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}}
			            variant="h5">
				40 ℃
			</Typography>
		</Box>
	</Container>)
}
export default ProfileData