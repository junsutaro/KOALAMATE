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
            console.log(nickname);
            setParticipants(prev => [...prev, {subscriber,nickname}]);
        });
        newSession.on('streamDestroyed', event => {
            setParticipants(prev => prev.filter(subscriber => subscriber.stream !== event.stream));
        });
        await newSession.connect(token);

        const publisher = OV.initPublisher('publisher-container');
        newSession.publish(publisher);

        setSession(newSession);
    }, [OV, session]);

    const disconnectSession = useCallback(() => {
        if (session) {
            session.disconnect();
            setSession(null);
            setParticipants([]);
        }
    }, [session]);

    return (
        <VoiceSocketContext.Provider value={{ session, participants, connectToSession, disconnectSession, setParticipants }}>
            {children}
            <div id='subscriberDiv'></div>
        </VoiceSocketContext.Provider>
    );
};

export const useVoiceSocket = () => useContext(VoiceSocketContext);
