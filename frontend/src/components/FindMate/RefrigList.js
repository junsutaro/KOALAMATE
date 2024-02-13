import React, { useEffect, useState } from "react";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import DefaultImg from 'assets/profile.jpg';
import { useNavigate } from 'react-router-dom';

const authHeader = localStorage.getItem('authHeader');

const RefrigList = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const getUserData = async () => {
        if (!authHeader) {
            console.error('Authorization token is missing');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8085/findmate/listMate`, {
                headers: {
                    'Authorization': authHeader
                }
            });
            setUserData(response.data);
        } catch (error) {
            console.error('유저 리스트를 가져오는 중 에러 발생: ', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    // 리스트 아이템 클릭 핸들러, id를 인자로 받음
    const handleListItemClick = (id) => {
        navigate(`/fridge/${id}`);
    };

    return (
        <Box sx={{ alignItems: 'flex-start' }}>
            <h3>내 주변의 냉장고</h3>
            <Divider />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {userData.map((user) => (
                    <React.Fragment key={user.id}>
                        <Box onClick={() => handleListItemClick(user.id)} style={{ cursor: 'pointer' }}>
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
                            <Divider />
                        </Box>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default RefrigList;
