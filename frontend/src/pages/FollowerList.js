import React, { useEffect, useState } from 'react';
import MyPageButton from '../components/Profile/MyPageButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FollowerList = () => {
	const { userId } = useParams();
	console.log(userId);

	const [followerData, setFollowerData] = useState({
		cnt: 0,
		list: [],
	});

	useEffect(() => {
		const getFollowerData = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/follower`);
				const data = response.data;
				setFollowerData({
					cnt: data.followCnt,
					list: data.list,
				});
			} catch (error) {
				console.log(`팔로워 데이터를 가져오는 중 에러 발생: `, error);
			}
		};

		getFollowerData();
	}, [userId]);

	console.log(followerData);

	return (
			<>
				<MyPageButton/>
				<h3>팔로워 목록 {followerData.cnt}</h3>
				<ul>
					{followerData.list.map(follower => (
							<li key={follower.id}>
								<span>닉네임 : {follower.nickname}  |   </span>
								<span>연령대 : {follower.birthRange}  |   </span>
								<span>성별 : {follower.gender}  |   </span>
								<span>프로필 이미지 : {follower.profile}  |   </span>
								<span>id : {follower.id}  |   </span>
							</li>
					))}
				</ul>
			</>
	);
};

export default FollowerList;
