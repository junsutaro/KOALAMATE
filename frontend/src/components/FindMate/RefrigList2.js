import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; // useParams 부분은 페이지 주소가 바뀔 때 사용하므로 지금은 필요 없음
import axios from "axios";
import {userData} from "three/nodes";


const RefrigList = () => {

    const [UserData, setUserData] = useState([]); //초기값은 빈 배열

    const getUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/list`);
            // console.log(response)
            // const data = response.data
            setUserData(response.data)
        }
        catch (error) {
            console.error('유저 리스트를 가져오는 중 에러 발생: ', error);
        }

    }

    getUserData();

    return (
        <Box sx={{ alignItems: 'flex-start' }}>
            <h3>내 주변의 냉장고</h3>
            <Divider/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {UserData.map((user, index) => (
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
        </Box>
    );
}

export default RefrigList;
