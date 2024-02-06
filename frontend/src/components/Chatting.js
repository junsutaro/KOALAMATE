import React, { useState, useEffect, useRef } from 'react';
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
import CustomChatField from './CustomChatField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Chatting = ({ roomNumber }) => {
	const { sendMessage, subscribe } = useWebSocket();
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	// 메시지를 수신할 대상 주소
	const messageDestination = `/topic/messages/${roomNumber}`;
	// 메시지를 전송할 대상 주소
	const sendDestination = `/app/messages/${roomNumber}`;
	const messagesEndRef = useRef(null);
	const [scrollY, setScrollY] = useState(false);

	const handleBottomDetect = (e) => {
		console.log(e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight);
		setScrollY(e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight - 10);
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const scrollToBottomDirect = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	}

	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		const watch = () => {
			window.addEventListener("scroll", handleBottomDetect);
		};
		watch();
		axios.post(`${process.env.REACT_APP_API_URL}/message/enter`, roomNumber, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				console.log("왜 여기 두 번 들어가냐");
			console.log(response);
				const reversedData = [...response.data].reverse(); // 배열 복사 후 역순으로 정렬
				reversedData.forEach((message) => {
					setMessages((prevMessages) => [...prevMessages, message]);
				});
			})
			.catch((error) => {
			console.error(error);
		})
			.finally(() => {
				setTimeout(scrollToBottomDirect, 10);
			});

		// 메시지 수신 구독
		const subscription = subscribe(messageDestination, (message) => {
			console.log("Message received");
			const receivedMessage = JSON.parse(message.body);
			console.log(receivedMessage);
			setMessages((prevMessages) => [...prevMessages, receivedMessage]);
			console.log(messages);
		});
		console.log(subscription);


		// 컴포넌트 언마운트 시 연결 해제
		return () => {
			console.log("asdfasdf");
			if (subscription) {
				console.log('Unsubscribed from ' + messageDestination);
				subscription.unsubscribe();
			}
			window.removeEventListener("scroll", handleBottomDetect);
		};
	}, [messageDestination]);

	const handleSendMessage = () => {
		if (inputMessage.trim() !== '') {
			const messageToSend = JSON.stringify({ content: inputMessage, nickname: user.nickname });
			sendMessage(sendDestination, messageToSend);
			setInputMessage('');
			console.log("Message sent");
		}
	};

	const handleInputMessageChange = (event) => {
		setInputMessage(event.target.value);
	};



	return (
			<Box sx={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
				<Box
					onScroll={handleBottomDetect}
						sx={{
							position: 'relative',
							height: 300,
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
										textAlign: message.nickname === `${user.nickname}` ? 'right' : 'left',
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
											backgroundColor: message.nickname === `${user.nickname}` ? '#0B93F6' : '#e0e0e0',
											color: message.nickname === `${user.nickname}` ? '#fff' : '#000',
										}}
								>
									{message.content}
								</Typography>
							</Box>
					))}
					<div ref={messagesEndRef} />
				</Box>
				{/* 스크롤 버튼 조건부 렌더링 */}
				{messages.length > 0 && !scrollY &&  scrollY !== 0 && (
					<IconButton onClick={scrollToBottom}
					        variant="contained"
					        sx={{
						        position: 'absolute', // 버튼을 절대 위치로 설정
						        bottom: '70px', // 채팅 입력창 위에 위치하도록 bottom 값 조정
						        right: '150px', // 오른쪽 정렬을 위한 right 값 설정
						        zIndex: 1, // 다른 요소들 위에 오도록 z-index 설정
					        }}>
						<ArrowDownwardIcon />
					</IconButton>
				)}
				<Grid container alignItems="center" border={1} borderColor="grey.500" borderRadius={4}>
					<Grid item xs={10}>
						<CustomChatField value={inputMessage} onChange={handleInputMessageChange} />
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
