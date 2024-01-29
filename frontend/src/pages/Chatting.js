import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SERVER_URL = 'http://192.168.100.210:8080/chat'; // Spring Boot 서버 SockJS 엔드포인트

const Chatting = () => {
	const [client, setClient] = useState(null);
	const [message1, setMessage1] = useState('');
	const [message2, setMessage2] = useState('');
	const [chat1, setChat1] = useState([]);
	const [chat2, setChat2] = useState([]);

	useEffect(() => {
		// STOMP 클라이언트 생성 및 구성
		const stompClient = new Client({
			webSocketFactory: () => new SockJS(SERVER_URL), // SockJS를 사용한 연결
			onConnect: () => {
				console.log('Connected');
				// 메시지를 받을 때 호출될 콜백 함수를 구독합니다.
				stompClient.subscribe('/topic/messages/1', (message) => {
					setChat1((prevChat) => [...prevChat, JSON.parse(message.body).content]);
				});
				stompClient.subscribe('/topic/messages/2', (message) => {
					setChat2((prevChat) => [...prevChat, JSON.parse(message.body).content]);
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

	const sendMessage1 = (e) => {
		e.preventDefault();
		if (client) {
			// 서버로 메시지를 전송합니다.
			client.publish({
				destination: '/app/message/1',
				body: JSON.stringify({ content: message1 }),
			});
			setMessage1('');
		}
	};
	const sendMessage2 = (e) => {
		e.preventDefault();
		if (client) {
			// 서버로 메시지를 전송합니다.
			client.publish({
				destination: '/app/message/2',
				body: JSON.stringify({ content: message2 }),
			});
			setMessage2('');
		}
	};

	return (
			<div>
				<ul id="messages">
					{chat1.map((msg, index) => (
							<li key={index}>{msg}</li>
					))}
				</ul>
				<form onSubmit={sendMessage1}>
					<input
							autoComplete="off"
							value={message1}
							onChange={(e) => setMessage1(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
				<ul id="messages1">
					{chat2.map((msg, index) => (
							<li key={index}>{msg}</li>
					))}
				</ul>
				<form onSubmit={sendMessage2}>
					<input
							autoComplete="off"
							value={message2}
							onChange={(e) => setMessage2(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>

	);
};

export default Chatting;
