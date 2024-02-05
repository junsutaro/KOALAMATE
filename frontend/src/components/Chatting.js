import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'context/WebSocketContext';
import {
	Box,
	TextField,
	Button,
	Typography,
	Grid,
	IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {AbortedDeferredError} from 'react-router-dom';
import CustomChatField from './CustomChatField';
import SendIcon from '@mui/icons-material/Send';

const Chatting = ({ roomNumber }) => {
	const { sendMessage, subscribe } = useWebSocket();
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	// 메시지를 수신할 대상 주소
	const messageDestination = `/topic/messages/${roomNumber}`;
	// 메시지를 전송할 대상 주소
	const sendDestination = `/app/messages/${roomNumber}`;

	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		// 메시지 수신 구독
		const subscription = subscribe(messageDestination, (message) => {
			console.log(messageDestination);
			const receivedMessage = message.body.content;
			console.log(receivedMessage)
			setMessages((prevMessages) => [...prevMessages, receivedMessage]);
			console.log("Message received");
		});

		// 컴포넌트 언마운트 시 연결 해제
		return () => {
		};
	}, [subscribe]);

	const handleSendMessage = () => {
		console.log(inputMessage);
		// (inputMessage.trim() !== '') {
		// const messageToSend = { message: "inputMessagasdfasdfe"};
		// 	const messageToSend = { content: inputMessage, nickname: user.nickName };
		// const messageToSend = "asdfasdf";
		const messageToSend = JSON.stringify({ content: "inputMessage", nickname: user.nickname });
			console.log(user.nickname);
			sendMessage(sendDestination, messageToSend);
			setInputMessage('');
			console.log("Message sent");
		//}
	};

	return (
			<Box sx={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
				<Box
						sx={{
							maxHeight: 300,
							overflowY: 'auto',
							marginBottom: 2,
							padding: 1,
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
				>
					{messages.map((message, index) => (
							<Box
									key={index}
									sx={{
										textAlign: message.sender === 'you' ? 'right' : 'left',
										margin: '10px 0',
									}}
							>
								<Typography
										variant="body1"
										sx={{
											display: 'inline-block',
											maxWidth: '70%',
											wordWrap: 'break-word',
											padding: '8px 16px',
											borderRadius: '20px',
											backgroundColor: message.sender === `${user.nickName}` ? '#0B93F6' : '#e0e0e0',
											color: message.sender === `${user.nickName}` ? '#fff' : '#000',
										}}
								>
									{message.text}
								</Typography>
							</Box>
					))}
				</Box>
				<Grid container alignItems="center" border={1} borderColor="grey.500" borderRadius={4}>
					<Grid item xs={10}>
						<CustomChatField />
					</Grid>
					<Grid item xs={2}>
						<IconButton variant="contained" onClick={handleSendMessage}>
							<SendIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
	);
};

export default Chatting;
