// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

const VoiceSocketContext = createContext(null);


const BACKEND_URL = `${process.env.REACT_APP_VOICE_URL}`;

export const VoiceSocketProvider = ({ children }) => {
	const [OV, setOV] = useState(null);
	const [token, setToken] = useState(null);
	const [session, setSession] = useState(null);
	const [stompClient, setStompClient] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		// WebSocket 연결이 필요한 시점에 activate 함수를 호출하여 연결을 시작합니다.
	}, []);

	async function createSession(roomId) {
		try {
			const response = await axios.post(`${BACKEND_URL}/sessions`, {customSessionId: roomId});
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
			// return response.data; // 토큰 반환
		} catch (error) {
			console.error('토큰 생성 실패:', error);
			throw error;
		}
	}

	async function connect() {
		const session = ov.initSession();

	}

	async function disconnect() {
	}

	useEffect(() => {
		// WebSocket 연결이 필요한 시점에 activate 함수를 호출하여 연결을 시작합니다.
		setOV((new OpenVidu()));
		setSession(OV.initSession());

		return () => {
			// cleanup
			if (OV)
				OV.disconnect();
		}
	} , []);

	return (
		<VoiceSocketContext.Provider value={{ createSession, createToken }}>
			{children}
		</VoiceSocketContext.Provider>
	);
};

export const useVoiceSocket = () => useContext(VoiceSocketProvider);
