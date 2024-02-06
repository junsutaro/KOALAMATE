// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// function RefrigList() {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         const getUserData = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/list`);
//                 const data = response.data;
//                 setUserData({
//
//
//                 });
//
//             } catch (error) {
//                 console.log('유저 데이터를 가져오는 중 에러 발생: ', error);
//             }
//         }---------------------------------------
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Divider from '@mui/material/Divider';
// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
//
// function UserList() {
// const [users, setUsers] = useState([]);
//
// useEffect(() => {
// axios.get(`${process.env.REACT_APP_API_URL}/user/list`)
//     .then(response => {
//         // 응답에서 원하는 데이터만 추출하여 상태에 저장
//         const userData = response.data.map(user => ({
//             nickname: user.nickname,
//             birthRange: user.birthRange,
//             gender: user.gender,
//             latitude: user.latitude,
//             longitude: user.longitude
//         }));
//         setUsers(userData);
//     })
//     .catch(error => console.error("There was an error!", error));
// }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 요청 실행
//
// // 사용자 정보를 리스트로 렌더링
//
// return (
//     <h5>내 주변의 냉장고</h5>
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//     <ListItem>
//         <ListItemAvatar>
//             <Avatar>
//                 <ImageIcon />
//             </Avatar>
//         </ListItemAvatar>
//         <ListItemText primary="Photos" secondary="Jan 9, 2014" />
//     </ListItem>
//     <Divider/>
//     </List>
//     );
//     }
//     <ul>
//     {users.map((user, index) => (
//         <li key={index}>
//             Nickname: {user.nickname}, BirthRange: {user.birthRange}, Gender: {user.gender},
//             Latitude: {user.latitude}, Longitude: {user.longitude}
//         </li>
//     ))}
//     </ul>
// );
// }
//
// export default UserList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function UserList() {
    // const [users, setUsers] = useState([]); 더미 지우고 이 줄 남기면 됨
    const [users, setUsers] = useState([
        { nickname: 'JaneDoe', birthRange: '20', gender: '여성', profileImage: 'path/to/profileImage1.png' },
        { nickname: 'JohnDoe', birthRange: '30', gender: '남성', profileImage: 'path/to/profileImage2.png' },
    ]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/list`)
            .then(response => {
                // 응답에서 원하는 데이터만 추출하여 상태에 저장
                const userData = response.data.map(user => ({
                    nickname: user.nickname,
                    birthRange: user.birthRange,
                    gender: user.gender,
                    profileImage: user.profile // 가정한 프로필 이미지 경로
                }));
                setUsers(userData);
            })
            .catch(error => console.error("There was an error!", error));
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 요청 실행

    // 사용자 정보를 리스트로 렌더링
    return (
        <>
            <h3>내 주변의 냉장고</h3>
            <Divider/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {users.map((user, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={user.profileImage}>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.nickname}
                                secondary={
                                    <Box display="flex" gap={1}>
                                        <Chip label={`${user.gender}`} sx={{
                                            bgcolor: user.gender === '여성' ? '#F8BBD0' : '#BBDEFB', // 여성일 때 핑크, 남성일 때 파란색
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
        </>
    );
}

export default UserList;
