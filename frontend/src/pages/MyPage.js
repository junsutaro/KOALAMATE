import React, {useState, useEffect} from 'react';
import {
	Box,
	Container,
} from '@mui/material';
import Profile from '../components/Profile/Profile';
import MyRecipe from '../components/Profile/MyRecipe';
import LikeRecipe from '../components/Profile/LikeRecipe';
import ProfileData from '../components/Profile/ProfileData';
import {NavLink, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {date} from 'yup';
import MyPageButton from '../components/Profile/MyPageButton';

const MyPage = () => {
	const {userId} = useParams();
	// const {user} = useSelector((state) => state.auth);
	// const userNickname = user.nickname;

	const [profileData, setProfileData] = useState({
		nickname: '',
		birthRange: 0,
		gender: '',
		profile: '',
		introduction: '',
		alcoholLimit: 0,
		mannersScore: 0,
		tags: [],
	});

	const [followerData, setFollowerData] = useState({
		cnt: 0,
		list: [],
	});
	const [followeeData, setFolloweeData] = useState({
		cnt: 0,
		list: [],
	});

	// userId가 바뀌면 user 프로필 정보를 가져오는 함수들
	useEffect(() => {
		const getProfileData = async () => {
			try {
				// const response = await axios.get(
				// 		`http://localhost:8080/profile/${userId}`);
				const response = await axios.get(
						`http://localhost:8080/profile/${userId}`);
				const data = response.data;
				setProfileData({
					nickname: data.nickname || '',
					birthRange: data.birthRange || 0,
					gender: data.gender === '1' ? '여성' : '남성',
					profile: data.profile || '',
					intro: data.introduction || '',
					alcoholLimit: data.alcoholLimit || 0,
					mannersScore: data.mannersScore || 0,
					tags: data.tags || [],
				});
			} catch (error) {
				console.log('프로필 데이터를 가져오는 중 에러 발생: ', error);
			}
		};

		const getFollowerData = async () => {
			try {
				const response = await axios.get(
						`http://localhost:8080/user/${userId}/follower`);
				const data = response.data;
				setFollowerData({
					cnt: data.followCnt,
					list: data.list,
				});

			} catch (error) {
				console.log(`팔로워 데이터를 가져오는 중 에러 발생 : `, error);
			}
		};

		const getFolloweeData = async () => {
			try {
				const response = await axios.get(
						`http://localhost:8080/user/${userId}/followee`);
				const data = response.data;
				setFolloweeData({
					cnt: data.followCnt,
					list: data.list,
				});
			} catch (error) {
				console.log(`팔로잉 데이터를 가져오는 중 에러 발생 : `, error);
			}
		};

		getProfileData();
		getFollowerData();
		getFolloweeData();

	}, [userId]);

	return (
			<Container>
				<MyPageButton
				/>
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
					<Profile
							img={profileData.profile}
							nickname={profileData.nickname}
							gender={profileData.gender}
							age={profileData.birthRange}
							follower={followerData}
							followee={followeeData}
					/>
					<ProfileData
							intro={profileData.intro}
							limit={profileData.alcoholLimit}
							mannersScore={profileData.mannersScore}
							tags={profileData.tags}
					/>
				</Box>
				<MyRecipe nickname={profileData.nickname}/>
				<LikeRecipe nickname={profileData.nickname}/>

			</Container>
	);
};

export default MyPage;
