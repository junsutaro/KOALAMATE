import React, { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';

const BACKEND_URL = `${process.env.REACT_APP_VOICE_URL}`;

async function createSession() {
	try {
		const response = await axios.post(`${BACKEND_URL}/sessions`, {customSessionId: '1'});
		return response.data; // 세션 ID 반환
	} catch (error) {
		console.error('세션 생성 실패:', error);
		throw error;
	}
}

async function createToken(sessionId) {
	try {
		const response = await axios.post(`${BACKEND_URL}/sessions/${sessionId}/connections`);
		return response.data; // 토큰 반환
	} catch (error) {
		console.error('토큰 생성 실패:', error);
		throw error;
	}
}

function VideoChat() {
	const [OV, setOV] = useState(null);
	const [session, setSession] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				// 세션 생성
				const sessionId = await createSession();
				// 토큰 생성
				const token = await createToken(sessionId);

				// OpenVidu 세션 초기화
				const ov = new OpenVidu();
				const session = ov.initSession();

				// 스트림 생성 이벤트 리스너 등록
				session.on('streamCreated', (event) => {
					session.subscribe(event.stream, 'video-container');
				});

				// 세션 연결
				await session.connect(token);

				// 발행자(Publisher) 초기화 및 발행
				const publisher = ov.initPublisher('publisher-container');
				session.publish(publisher);

				setOV(ov);
				setSession(session);
			} catch (error) {
				console.error('화상 채팅 설정 실패:', error);
			}
		})();
	}, []);

	useEffect(() => {
		return () => {
			// 컴포넌트 언마운트 시 세션 연결 해제
			session && session.disconnect();
			OV && OV.disconnect();
		};
	}, [session, OV]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
			<Typography variant="h4" gutterBottom>
				화상 채팅
			</Typography>
			<Paper elevation={3} sx={{ width: '80%', height: 500, mb: 2, position: 'relative' }}>
				<div id="publisher-container" style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }} />
				<div id="video-container" style={{ width: '100%', height: '100%' }} />
			</Paper>
		</Box>
	);
}

export default VideoChat;
