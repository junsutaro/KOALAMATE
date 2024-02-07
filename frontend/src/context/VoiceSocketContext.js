// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

const VoiceSocketContext = createContext(null);

export const VoiceSocketProvider = ({ children }) => {
    const [OV, setOV] = useState(null);
    const [token, setToken] = useState(null);
    const [session, setSession] = useState(null);
    let [streamUnsubscribe] = useState(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        // WebSocket 연결이 필요한 시점에 activate 함수를 호출하여 연결을 시작합니다.
    }, []);
    const checkRoomId = (id) => {
        if(roomId !== id) {
            setRoomId(id);
            return true;
        }
        else
            return false;
    }
    const unSubscribeVoice = () => {
        console.log(session);
        if(streamUnsubscribe !== null)
            session.unsubscribe(streamUnsubscribe);
    }
    const setStreamUnsubscribe = (input) => {
        streamUnsubscribe = input;
    }
    const subscribeVoice = async () => {
        console.log(session);
        session.on('streamCreated', (event) => {
            session.subscribe(event.stream,'video-container');
            streamUnsubscribe = event.stream;
        });
        return session
    }

    const publishVoice = () => {
        const publisher = OV.initPublisher('publisher-container');
        session.publish(publisher);

        setSession(session);
    }

    const connectVoice = () => {
        setOV((new OpenVidu()));
        console.log(OV);
        setSession(OV.initSession());
        console.log(session);
    }

    const updateSession = (input) => {
        setSession(input);
    }

    const disconnectVoice = () => {
        if(session)
            session.disconnect();
        if (OV)
            OV.disconnect();
    }

    useEffect(() => {
        // WebSocket 연결이 필요한 시점에 activate 함수를 호출하여 연결을 시작합니다.
        return () => {
            // cleanup
            if(session)
                session.disconnect();
            if (OV)
                OV.disconnect();
        }
    } , []);

    return (
        <VoiceSocketContext.Provider value={{ connectVoice, disconnectVoice, subscribeVoice, unSubscribeVoice, publishVoice, checkRoomId, session, OV, streamUnsubscribe, setStreamUnsubscribe }}>
            {children}
        </VoiceSocketContext.Provider>
    );
};

export const useVoiceSocket = () => useContext(VoiceSocketContext);