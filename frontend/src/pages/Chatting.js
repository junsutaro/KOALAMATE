import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'context/WebSocketContext';

const Chatting = () => {
	const { sendMessage, subscribe } = useWebSocket();
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	// 메시지를 수신할 대상 주소
	const messageDestination = "/topic/messages/1";
	// 메시지를 전송할 대상 주소
	const sendDestination = "/app/messages/1";

	useEffect(() => {
		// 메시지 수신 구독
		const subscription = subscribe(messageDestination, (message) => {
			console.log("qwerqwerqwerqwer");
			const receivedMessage = message.body;
			console.log(receivedMessage)
			setMessages((prevMessages) => [...prevMessages, receivedMessage]);
		});

		// 컴포넌트 언마운트 시 연결 해제
		return () => {
		};
	}, [subscribe]);

	const handleSendMessage = () => {
		if (inputMessage.trim() !== '') {
			sendMessage(sendDestination, inputMessage);
			setInputMessage('');
			console.log("asdfasdfasdfasdfasdf")
		}
	};

	return (
			<div>
				<div className="chat-box">
					{messages.map((message, index) => (
							<div key={index} className="message">
								{message.body}
							</div>
					))}
				</div>
				<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
				/>
				<button onClick={handleSendMessage}>Send</button>
			</div>
	);
};

export default Chatting;
