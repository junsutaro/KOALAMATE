import React, { createContext, useContext, useState, useCallback } from 'react';
import { OpenVidu } from 'openvidu-browser';

const VoiceSocketContext = createContext();

export const VoiceSocketProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [OV, setOV] = useState(new OpenVidu());
    const [participants, setParticipants] = useState([]);

    const connectToSession = useCallback(async (token) => {
        if (session) session.disconnect(); // 기존 세션 연결 해제

        const newSession = OV.initSession();
        newSession.on('streamCreated', event => {
            const subscriber = newSession.subscribe(event.stream, 'subscriberDiv');
            const nickname = event.stream.connection.data.split("=")[1];
            // 이전 상태를 기반으로 새 상태를 계산
            setParticipants(prevParticipants => [...prevParticipants, { subscriber, nickname }]);
            console.log(participants);
        });
        newSession.on('streamDestroyed', event => {
            const nickname = event.stream.connection.data.split("=")[1];
            setParticipants(prev => prev.filter(participant => participant.nickname !== nickname));
        });
        await newSession.connect(token);

        const publisher = OV.initPublisher('publisher-container');
        newSession.publish(publisher);

        setSession(newSession);
    }, [OV, session]);

    const disconnectSession = useCallback(() => {
        if (session) {
            console.log(session);
            session.disconnect();
            setSession(null);
            setParticipants([]);
        }
    }, [session]);

    return (
        <VoiceSocketContext.Provider value={{ session, participants, connectToSession, disconnectSession, setParticipants }}>
            {children}
            <div id='subscriberDiv'></div>
            {/*<div id='publisher-container'></div>*/}
        </VoiceSocketContext.Provider>
    );
};

export const useVoiceSocket = () => useContext(VoiceSocketContext);
