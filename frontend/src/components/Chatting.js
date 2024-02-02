import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SERVER_URL = `${process.env.REACT_APP_API_URL}/chat`; // Spring Boot 서버 SockJS 엔드포인트

const Chatting = () => {
	const [client, setClient] = useState(null);
	const [message, setMessage] = useState('');
	const [chat, setChat] = useState([]);

	useEffect(() => {
		// STOMP 클라이언트 생성 및 구성
		const stompClient = new Client({
			webSocketFactory: () => new SockJS(SERVER_URL), // SockJS를 사용한 연결
			onConnect: () => {
				console.log('Connected');
				// 메시지를 받을 때 호출될 콜백 함수를 구독합니다.
				stompClient.subscribe('/topic/messages', (message) => {
					setChat((prevChat) => [...prevChat, JSON.parse(message.body).content]);
				});
			},
			onStompError: (frame) => {
				console.error('Broker reported error: ' + frame.headers['message']);
				console.error('Additional details: ' + frame.body);
			},
		});

		stompClient.activate();
		setClient(stompClient);

		return () => {
			stompClient.deactivate();
		};
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (client) {
			// 서버로 메시지를 전송합니다.
			client.publish({
				destination: '/app/message',
				body: JSON.stringify({ content: message }),
			});
			setMessage('');
		}
	};

	return (
			<div>
				<ul id="messages">
					{chat.map((msg, index) => (
							<li key={index}>{msg}</li>
					))}
				</ul>
				<form onSubmit={sendMessage}>
					<input
							autoComplete="off"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
	);
};

export default Chatting;