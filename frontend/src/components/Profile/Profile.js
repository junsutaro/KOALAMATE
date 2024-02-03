import React, {useEffect, useState} from 'react';

import {Avatar, Typography, Box, Chip, Button} from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1'; // Import the correct icon
// import standardImg from 'assets/profile.jpg'
import {NavLink} from 'react-router-dom';

const standardImgPath = '/assets/profile.jpg';

const Profile = ({img, nickname, gender, age, follower, followee, userId}) => {
    console.log(img)

    // 이미지 경로를 public 폴더로 업데이트
    // const profileImage = img || 'assets/profile.jpg'; // 기본 이미지 경로 설정

    const profileImage = img || '/assets/profile.jpg'
    console.log(profileImage)
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


                {/* `Avatar` 컴포넌트와 `img` 태그 모두에서 동일한 경로를 사용합니다. */}
                <Avatar sx={{width: 200, height: 200}} src={profileImage}/>


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
                    <Chip label={`${age}대`} variant="Filled"
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
                            to="/user/4/follower">팔로워 {followerCnt}</Button>
                    <Button m={1} p={1} component={NavLink}
                            to="/user/4/followee">팔로우 {followeeCnt}</Button>

                </Box>

            </Box>
        </>
    )
        ;
};

export default Profile;
