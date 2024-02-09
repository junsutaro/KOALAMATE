// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { disconnectStompClient, getStompClient } from './WebSocketService';
import axios from "axios";


const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [stompClient, setStompClient] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		// WebSocket 연결이 필요한 시점에 activate 함수를 호출하여 연결을 시작합니다.
	}, []);

	const connect = (url) => {
		const client = new Client({
			webSocketFactory: () => new SockJS(url),
			onConnect: () => {
				setConnected(true);
				console.log('Connected to WebSocket server');
			},
			onStompError: (frame) => {
				console.error('Broker reported error: ' + frame.headers['message']);
				console.error('Additional details: ' + frame.body);
			},
		});

		client.activate();
		setStompClient(client);
	};

	const disconnect = () => {
		if (stompClient && stompClient.connected) {
			stompClient.deactivate();
			setConnected(false);
			console.log('Disconnected from WebSocket server');
		}
	};

	const subscribe = (destination, callback) => {
		if (stompClient && stompClient.connected) {
			const subscription = stompClient.subscribe(destination, callback);
			console.log("Subscribed to " + destination);
			return subscription; // 구독 객체 반환
		}
		return null;
	};

	const sendMessage = (destination, body) => {
		if (stompClient && stompClient.connected) {
			stompClient.publish({
				destination: destination,
				body: body,
			});
		}
	};

	const getRoomList = async () => {
		try {
			const authHeader = localStorage.getItem('authHeader');
			console.log('Auth Header: ', authHeader);
			return await axios.post(`${process.env.REACT_APP_API_URL}/chatroom/roomlist`, {},{
				headers: {
					'Authorization': authHeader,
				},
				withCredentials: true});
		} catch (error) {
			console.log('Get Room List Error: ', error);
			throw error;
		}
	}


	return (
			<WebSocketContext.Provider value={{ stompClient, connected, connect, disconnect, sendMessage, subscribe, getRoomList }}>
				{children}
			</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => useContext(WebSocketContext);
