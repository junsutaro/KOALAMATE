import React, { useEffect, useState } from 'react';
import MyPageButton from '../components/Profile/MyPageButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FolloweeList = () => {
	const { userId } = useParams();
	console.log(userId);

	const [followeeData, setFolloweeData] = useState({
		cnt: 0,
		list: [],
	});

	useEffect(() => {
		const getFolloweeData = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/followee`);
				const data = response.data;
				setFolloweeData({
					cnt: data.followCnt,
					list: data.list,
				});
			} catch (error) {
				console.log(`팔로잉 데이터를 가져오는 중 에러 발생: `, error);
			}
		};

		getFolloweeData();
	}, [userId]);

	console.log(followeeData);

	return (
			<>
				<MyPageButton/>
				<h3>팔로워 목록 {followeeData.cnt}</h3>
				<ul>
					{followeeData.list.map(followee => (
							<li key={followee.id}>
								{/* 여기에서 follower 객체의 필요한 속성을 사용하여 렌더링 */}
								<span>닉네임 : {followee.nickname}  |   </span>
								<span>연령대 : {followee.birthRange}  |   </span>
								<span>성별 : {followee.gender}  |   </span>
								<span>프로필 이미지 : {followee.profile}  |   </span>
								<span>id : {followee.id}  |   </span>
							</li>
					))}
				</ul>
			</>
	);
};

export default FolloweeList;
