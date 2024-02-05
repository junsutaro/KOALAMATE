// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

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
			console.log("qwewaerawerwegadgaestetawetaewraewr")
			console.log(destination);
			stompClient.subscribe(destination, callback);
		}
	};

	const sendMessage = (destination, body) => {
		if (stompClient && stompClient.connected) {
			stompClient.publish({
				destination: destination,
				body: body,
			});
		}
	};

	return (
			<WebSocketContext.Provider value={{ stompClient, connected, connect, disconnect, sendMessage, subscribe }}>
				{children}
			</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => useContext(WebSocketContext);
