import React, { useEffect } from 'react';
import { useVoiceSocket } from 'context/VoiceSocketContext';
import axios from 'axios';
import {useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Paper} from "@mui/material";

const BACKEND_URL = process.env.REACT_APP_VOICE_URL;

const VoiceChatRoom = () => {
    const { roomId } = useParams();
    const location = useLocation();
    // location 객체에서 state 속성을 통해 전달된 데이터를 읽음
    const { users } = location.state;
    const { connectToSession, disconnectSession, participants, setParticipants, publisher, setUsers, setCurUser } = useVoiceSocket();
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

                setUsers(users);
                setCurUser(curUser);
                //setParticipants(users);
            } catch (error) {
                console.error('Error setting up voice chat:', error);
            }
        })();
        //return () => disconnectSession(); // Cleanup on component unmount
    }, [roomId]);



    return (
        <div>
            <h2>Voice Chat Room: {roomId}</h2>
        </div>
    );
};

export default VoiceChatRoom;