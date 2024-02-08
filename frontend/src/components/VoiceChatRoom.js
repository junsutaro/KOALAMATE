import React, { useEffect } from 'react';
import { useVoiceSocket } from 'context/VoiceSocketContext';
import axios from 'axios';
import {useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import { Paper, Avatar, Grid, Typography } from "@mui/material";


const BACKEND_URL = process.env.REACT_APP_VOICE_URL;

const VoiceChatRoom = () => {
    const { roomId } = useParams();
    const location = useLocation();
    // location 객체에서 state 속성을 통해 전달된 데이터를 읽음
    const { users } = location.state;
    const { connectToSession, disconnectSession, participants, setParticipants, publisher } = useVoiceSocket();
    // ... useEffect 등 기존 로직
    const curUser = useSelector(state => state.auth.user);

    useEffect(() => {
        console.log(curUser);
        (async () => {
            try {
                // 세션 생성
                const sessionIdResponse = await axios.post(`${BACKEND_URL}/sessions`, {customSessionId: roomId });
                const sessionId = sessionIdResponse.data;
                const tokenResponse = await axios.post(`${BACKEND_URL}/sessions/${sessionId}/connections`, {customNickname: curUser.nickname});
                //console.log(tokenResponse);
                const token = tokenResponse.data;
                //console.log(token);
                //console.log(users);
                connectToSession(token);

                //setParticipants(users);
            } catch (error) {
                console.error('Error setting up voice chat:', error);
            }
        })();
        //return () => disconnectSession(); // Cleanup on component unmount
    }, [roomId]);

    useEffect(() => {
        const subscriberDiv = document.getElementById('userList');
        subscriberDiv.innerHTML = ''; // 기존 내용을 초기화

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerText = user.nickname; // 닉네임 표시
            userDiv.style.border = '2px solid grey'; // 기본 회색 테두리
            userDiv.style.margin = '10px';
            userDiv.style.padding = '10px';

            // 접속한 사용자와 일치하는지 확인
            if (participants.some(p => p.nickname === user.nickname) || user.nickname === curUser.nickname) {
                userDiv.style.border = '2px solid blue'; // 접속한 사용자는 파란색 테두리
            }

            subscriberDiv.appendChild(userDiv);
        });
    }, [participants, users]); // participants 또는 users가 변경될 때마다 실행

    return (
        <div>
            <h2>Voice Chat Room: {roomId}</h2>
            <Paper elevation={3} style={{ width: '80%', margin: 'auto', height: 500, position: 'relative', overflowY: 'scroll' }}>
                <Grid container spacing={2} justifyContent="center" style={{ padding: 20 }}>
                    {users.map(user => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.nickname} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar src={user?.profile || 'default_profile_picture_url'} sx={{ width: 100, height: 100, border: `2px solid ${participants.some(p => p.nickname === user.nickname) || user.nickname === curUser.nickname ? 'blue' : 'grey'}` }} />
                            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                                {user.nickname}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
};

export default VoiceChatRoom;