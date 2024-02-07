import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Paper, Typography} from '@mui/material';
import axios from 'axios';
import {useVoiceSocket} from 'context/VoiceSocketContext';
import {OpenVidu} from "openvidu-browser";

const BACKEND_URL = `${process.env.REACT_APP_VOICE_URL}`;
const VoiceChatRoom = () => {
    const [sessionId, setSessionId] = useState(null);
    const [token, setToken] = useState(null);
    const {updateSession, checkRoomId, subscribeVoice, unSubscribeVoice, publishVoice, session, OV, setStreamUnsubscribe} = useVoiceSocket();
	let {streamUnsubscribe} = useVoiceSocket();
    const {roomId} = useParams();


    useEffect(() => {
        (async () => {
            if (checkRoomId(roomId)) {
                try {
                    // 세션 생성
                    const sessionId = await createSession();
                    // 토큰 생성
                    const token = await createToken(sessionId);

					unSubscribeVoice();

                    // 스트림 생성 이벤트 리스너 등록
                    session.on('streamCreated', (event) => {
                        session.subscribe(event.stream, 'video-container');
						setStreamUnsubscribe(event.stream);
                    });

                    // 세션 연결
                    await session.connect(token);

                    // 발행자(Publisher) 초기화 및 발행
                    const publisher = OV.initPublisher('publisher-container');
                    session.publish(publisher);
                    updateSession(session);

                } catch (error) {
                    console.error('화상 채팅 설정 실패:', error);
                }
            }
        })();
    }, [session, roomId]);

    async function createSession(roomId) {
        try {
            const response = await axios.post(`${BACKEND_URL}/sessions`, {customSessionId: roomId});
            console.log(response.data);
            setSessionId(response.data);
            return response.data; // 세션 ID 반환
        } catch (error) {
            console.error('세션 생성 실패:', error);
            throw error;
        }
    }

    async function createToken(sessionId) {
        try {
            const response = await axios.post(`${BACKEND_URL}/sessions/${sessionId}/connections`);
            setToken(response.data);
            return response.data; // 토큰 반환
        } catch (error) {
            console.error('토큰 생성 실패:', error);
            throw error;
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2}}>
            <Typography variant="h4" gutterBottom>
                화상 채팅
            </Typography>
            <Paper elevation={3} sx={{width: '80%', height: 500, mb: 2, position: 'relative'}}>
                <div id="publisher-container" style={{position: 'absolute', bottom: 10, right: 10, zIndex: 10}}/>
                <div id="video-container" style={{width: '100%', height: '100%'}}/>
            </Paper>
        </Box>
    );
}

export default VoiceChatRoom;
