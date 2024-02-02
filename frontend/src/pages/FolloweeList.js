import React, { useEffect, useState } from 'react';
import MyPageButton from '../components/Profile/MyPageButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FollowItem from '../components/Follow/FollowItem';

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
				const response = await axios.get(`http://localhost:8080/user/${userId}/followee`);
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
							<FollowItem
									key={followee.id}
									id={followee.id}
									nickname={followee.nickname}
									birthRange={followee.birthRange}
									gender={followee.gender}
									imgSrc={followee.profile}
							/>
					))}
				</ul>
			</>
	);
};

export default FolloweeList;
