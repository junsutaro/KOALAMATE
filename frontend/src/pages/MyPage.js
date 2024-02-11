import React, {useState, useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Profile from '../components/Profile/Profile';
import MyRecipe from '../components/Profile/MyRecipe';
import LikeRecipe from '../components/Profile/LikeRecipe';
import DetailProfile from '../components/Profile/DetailProfile';
import MyPageButton from '../components/Profile/MyPageButton';
import axios from 'axios';
import {
    Box,
    Container,
} from '@mui/material';

const MyPage = () => {
    const {userId} = useParams();
    // 인증 헤더를 가져오는 함수
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? {Authorization: authHeader} : {};
    };    // console.log(userId)
    // const {user} = useSelector((state) => state.auth);
    // const userNickname = user.nickname;

    const [profileImageUrl, setProfileImageUrl] = useState()
    const [profileData, setProfileData] = useState({
        nickname: '',
        birthRange: 0,
        gender: '',
        introduction: '',
        alcoholLimitBottle: 0,
        alcoholLimitGlass: 0,
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


    const getProfileData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/profile/${userId}`);
            const data = response.data;

            // 이미지 URL을 가져와서 상태 업데이트
            setProfileImageUrl(`/${data.profile}`)

            // 나머지 프로필 데이터 업데이트
            setProfileData({
                nickname: data.nickname,
                birthRange: data.birthRange,
                gender: data.gender,
                intro: data.introduction || '',
                alcoholLimitBottle: data.alcoholLimitBottle,
                alcoholLimitGlass: data.alcoholLimitGlass,
                mannersScore: data.mannersScore,
                tags: data.tags || [],
            });
        } catch (error) {
            console.log('프로필 데이터를 가져오는 중 에러 발생: ', error);
        }
    };

    const getFollowerData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user/${userId}/follower`);
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
                `${process.env.REACT_APP_API_URL}/user/${userId}/followee`);
            const data = response.data;
            setFolloweeData({
                cnt: data.followCnt,
                list: data.list,
            });
        } catch (error) {
            console.log(`팔로잉 데이터를 가져오는 중 에러 발생 : `, error);
        }
    };

    // userId가 바뀌면 user 프로필 정보를 가져오기
    useEffect(() => {
        getProfileData();
        getFollowerData();
        getFolloweeData();
    }, [userId]);

    return (
        <Container>
            <MyPageButton/>

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
                    userId={userId}
                    img={profileImageUrl}
                    nickname={profileData.nickname}
                    gender={profileData.gender}
                    age={profileData.birthRange}
                    follower={followerData}
                    followee={followeeData}
                />
                <DetailProfile
                    intro={profileData.intro}
                    alcoholLimitBottle={profileData.alcoholLimitBottle}
                    alcoholLimitGlass={profileData.alcoholLimitGlass}
                    mannersScore={profileData.mannersScore}
                    tags={profileData.tags}
                />
            </Box>
            <MyRecipe nickname={profileData.nickname} userId={userId}/>
            <LikeRecipe nickname={profileData.nickname}/>

        </Container>
    );
};

export default MyPage;
