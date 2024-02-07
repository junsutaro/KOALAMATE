import React, {useEffect, useState} from 'react';

import {Avatar, Typography, Box, Chip, Button} from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1'; // Import the correct icon
// import standardImg from 'assets/profile.jpg'
import {NavLink} from 'react-router-dom';
import FollowMiniBox from "../Follow/FollowMiniBox";

const standardImgPath = '/assets/profile.jpg';

const Profile = ({img, nickname, gender, age, follower, followee, userId}) => {
    console.log(img)

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

                <FollowMiniBox userId={userId} followerCnt={followerCnt} followeeCnt={followeeCnt} />
                {/*<FollowBtn userId={userId} targetUserId={targetUserId} />*/}
            </Box>
        </>
    )
        ;
};

export default Profile;
