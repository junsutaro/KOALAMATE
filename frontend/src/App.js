import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainLayout from './Layout/MainLayout';
import { CssBaseline } from '@mui/material';
import { setLoginStatus } from './store/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useWebSocket } from './context/WebSocketContext';

import styles from './App.css'

// 다른 페이지 컴포넌트들을 임포트

function App () {
	const {connect} = useWebSocket();
	const dispatch = useDispatch();
	useEffect(() => {
		// 로컬 스토리지에 로그인 정보가 있으면 벡에 유효성 검증 요청
		const authHeader = localStorage.getItem('authHeader');
		if (authHeader) {
			// 유효성 검증 요청
			axios.get(`${process.env.REACT_APP_API_URL}/auth/status`, {
				headers: {
					'Authorization': authHeader,
				},
				withCredentials: true,
			})
				.then((response) => {
					console.log('Auth Response: ', response);
					connect(`${process.env.REACT_APP_CHAT_URL}`);
				})
				.catch((error) => {
					console.log('Auth Error: ', error);
					// 유효성 검증 실패 시 로그인 정보 삭제
					localStorage.removeItem('authHeader');
					dispatch(setLoginStatus({ isLoggedIn: false, user: null }));
				});
		}
	}, []);
	return (
		<CssBaseline>
			<Router>
				<div className="App">
					<MainLayout/>
				</div>
			</Router>
		</CssBaseline>
	);
}

export default App;