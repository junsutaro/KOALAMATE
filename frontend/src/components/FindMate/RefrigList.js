import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import DefaultImg from 'assets/profile.jpg';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const authHeader = localStorage.getItem('authHeader');

const RefrigList = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const curUser = useSelector(state => state.auth.user);

    const getUserData = async () => {
        if (!authHeader) {
            console.error('Authorization token is missing');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/findmate/listMate`, {
                headers: {
                    'Authorization': authHeader
                }
            });
            const filteredData = response.data.filter(user => user.nickname !== curUser.nickname);
            console.log(filteredData);
            setUserData(filteredData);
        } catch (error) {
            console.error('유저 리스트를 가져오는 중 에러 발생: ', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    // 리스트 아이템 클릭 핸들러, id를 인자로 받음
    const handleListItemClick = (id) => {
        navigate(`/user/${id}`);
    };

    return (
        <Box sx={{ alignItems: 'flex-start' }}>
            <h3>내 주변의 냉장고</h3>
            <Divider />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {userData.map((user) => (
                    <React.Fragment key={user.id}>
                        <Box onClick={() => handleListItemClick(user.id)} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={user.profile ? `${process.env.REACT_APP_IMAGE_URL}/${user.profile}` : DefaultImg} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.nickname}
                                    secondary={
                                        <Box display="flex" gap={1}>
                                            <Chip label={user.gender} sx={{
                                                bgcolor: (user.gender === '여자' || user.gender === '여성') ? '#F8BBD0' : '#BBDEFB',
                                            }} />
                                            <Chip label={`${user.birthRange}대`} sx={{ bgcolor: '#CDFAD5' }} />
                                        </Box>
                                    }
                                />
                            </ListItem>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginRight: 2 }}>
                                {user.follow && <FavoriteIcon color="error" />}
                            </Box>
                        </Box>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default RefrigList;
