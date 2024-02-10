import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; // useParams 부분은 페이지 주소가 바뀔 때 사용하므로 지금은 필요 없음
import axios from "axios";
import {userData} from "three/nodes";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import DefaultImg from 'assets/profile.jpg'

const authHeader = localStorage.getItem('authHeader');


const RefrigList = () => {

    const [UserData, setUserData] = useState([]); //초기값은 빈 배열
    //const user = useSelector((state) => state.auth.user);

    console.log(authHeader);


    const getUserData = async () => {
        if (!authHeader) {
            console.error('Authorization token is missing');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/list`,
                {
                    headers: {
                        'Authorization': authHeader // 요청 헤더에 인증 토큰 추가
                    }
                }
            );
            console.log(response.data)
            // const data = response.data
            setUserData(response.data)
        } catch (error) {
            console.error('유저 리스트를 가져오는 중 에러 발생: ', error);
        }
    }


   useEffect(() => {
      getUserData()
   }, []);

    // const standardImgPath = '/assets/profile.jpg';
    // const profileImage = user.profile ? `http://localhost:3000/${user.profile}` : '/assets/profile.jpg';
    return (
        <Box sx={{ alignItems: 'flex-start' }}>
            <h3>내 주변의 냉장고</h3>
            <Divider/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {UserData.map((user, index) => (

                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                {/*<Avatar src={profileImage}/>*/}
                                {/*<Avatar src={user.profile ? `${process.env.REACT_APP_API_URL}/${user.profile}` : '/assets/profile.jpg'}>*/}
                                <Avatar src={user.profile ? `${process.env.REACT_APP_IMAGE_URL}/${user.profile}` : DefaultImg}>
                                    {/*<ImageIcon />*/}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.nickname}
                                secondary={
                                    <Box display="flex" gap={1}>
                                        <Chip label={`${user.gender}`} sx={{
                                            // bgcolor: user.gender === '여자' ? '#F8BBD0' : '#BBDEFB', // 여성일 때 핑크, 남성일 때 파란색
                                            bgcolor : (user.gender === '여자' || user.gender === '여성') ? '#F8BBD0' : '#BBDEFB',
                                        }}
                                        />
                                        <Chip label={`${user.birthRange}대`} sx={{ bgcolor: '#CDFAD5' }} />
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

export default RefrigList;
