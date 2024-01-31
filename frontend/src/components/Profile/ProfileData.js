import {Box, Chip, Container, Typography, Slider} from '@mui/material';
import Soju from '../../assets/alcohol.png';
import SojuCup from '../../assets/cup.png';
import React, {useEffect, useState} from 'react';

const ProfileData = ({intro, limit, mannersScore, tags}) => {
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
					gap: windowWidth > 600 ? 5 : 1,
					width: '100%',
					'@media (max-width: 600px)': {
						flexDirection: 'column',
					},
				}}
		>
			<Box>


				<Typography sx={{fontWeight: 'bold', marginBottom: 2}} variant="h5">
					주량
				</Typography>

				{Array.from({length: Math.min(limit, 10)}, (_, index) => (
						<img
								key={index}
								src={Soju}
								alt={`Soju Image ${index + 1}`}
								width={windowWidth > 600 ? 25 : 20}
						/>

			))}

				{Array.from({length: Math.min(limit, 10)}, (_, index) => (
						<img
								key={index}
								src={SojuCup}
								alt={`Soju Image ${index + 1}`}
								width={windowWidth > 600 ? 25 : 20}
						/>

				))}


		</Box>
		<Box>
			<p>{intro}</p>
			<Typography sx={{fontWeight: 'bold', color: '#00a152'}}
			            variant="h4">
				소주 {limit}병
			</Typography>
		</Box>
	</Box>
	<Box sx={{marginTop: 5}}>
		<Typography sx={{fontWeight: 'bold'}} variant="h5">
			선호하는 모임
		</Typography>
		<Box sx={{display: 'flex', gap: 2, marginTop: 2}}>
			{tags.map((tag) => (
					<Chip key={tag} label={tag} variant="Filled"/>
			))}
		</Box>
	</Box>


	<Box sx={{marginTop: 5, display: 'flex', gap: 5}}>
		<Typography sx={{fontWeight: 'bold'}} variant="h5">
			당근 온도
		</Typography>
		<Slider
				value={mannersScore}
				name="carrot"
				sx={{width: 200, color: '#ff9b9b'}}  // 원하는 스타일을 추가로 설정할 수 있음
		/>
		<Typography sx={{fontWeight: 'bold', color: '#ff9b9b'}} variant="h5">
			{mannersScore}
		</Typography>
	</Box>

</Container>
)

}
export default ProfileData;