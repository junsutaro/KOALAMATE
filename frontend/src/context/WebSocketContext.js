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

	}, []);

	const connect = (url) => {
		const client = getStompClient(url);
		setStompClient(client);
	};

	const disconnect = () => {
		disconnectStompClient();
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
