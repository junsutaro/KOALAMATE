import React from 'react';
import axios from 'axios';
import {TextField, Button, Container, Typography, Box} from '@mui/material';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('Login: ', email, password);

		try {
			const response = await axios.post('http://localhost:8080/user/login',
					{
						email: email,
						password: password,
					});
			console.log(response.data);
		} catch (error) {
			console.log(error);
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
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
						<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
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