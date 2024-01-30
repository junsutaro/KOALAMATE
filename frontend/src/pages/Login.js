import React from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setLoading, setLoginStatus } from '../store/authSlice';
import { useWebSocket } from 'context/WebSocketContext';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { connect } = useWebSocket();


	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('Login: ', email, password);
		dispatch(setLoading(true));

		try {
			const response = await axios.post('/user/login', {
				email,
				password,
			}, {withCredentials: true});
			dispatch(setLoginStatus({ isLoggedIn: true, user: response.data }));
			connect('http://192.168.100.210:8080/chat');
			console.log(response.data);
			navigate('/');
		} catch (error) {
			console.log(error);
			dispatch(setLoginStatus(false));
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
			<Container maxWidth="xs">
				<Box sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					<Typography component="h1" variant="h5">
						로그인
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
						<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="이메일"
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="비밀번호"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{mt: 3, mb: 2}}
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Container>
	);
};

export default Login;