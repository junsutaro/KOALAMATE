import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import MyPageButton from '../components/Profile/MyPageButton';
import FollowItem from '../components/Follow/FollowItem';
import {Box} from '@mui/material';

const FollowerList = () => {
    const {userId} = useParams();
    console.log(userId);

    const [followerData, setFollowerData] = useState({
        cnt: 0,
        list: [],
        user: '',
        id: 0,
    });

    useEffect(() => {
        const getFollowerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}/follower`);
                const data = response.data;
                setFollowerData({
                    cnt: data.followCnt,
                    list: data.list,
                    user: data.nickname,
                    id: data.id,
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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <h3>{followerData.user}님의 팔로워 목록 {followerData.cnt}</h3>
                <ul>
                    {followerData.list.map(follower => (
                        <FollowItem
                            key={follower.id}
                            id={follower.id}
                            nickname={follower.nickname}
                            birthRange={follower.birthRange}
                            gender={follower.gender}
                            img={follower.profile}
                            intro={follower.introduction}
                        />
                    ))}
                </ul>
            </Box>
        </>
    );
}
export default FollowerList;
