import React from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginStatus} from '../store/authSlice';
import logoImage from 'assets/logo.png';
import axios from 'axios';

const Nav = () => {
	const { user, isLoggedIn } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post('/user/logout', {}, {withCredentials: true});
			dispatch(setLoginStatus(false));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
			<AppBar position="static">
				<Toolbar>
					<Box component={NavLink} to="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'inherit' }}>
						<img src={logoImage} alt="Logo" style={{ maxHeight: '50px' }} />
						<Typography variant="h6" noWrap component='a' sx={{
							ml: 2,
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							letterSpacing: '.2rem'
						}}>
								코알라 친구찾기
						</Typography>
					</Box>
					<Button color="inherit" component={NavLink} to="/about">
						About
					</Button>
					<Button color="inherit" component={NavLink} to="/1/comments">
						댓글 확인
					</Button>
					<Button color="inherit" component={NavLink} to="/recipe">
						Recipe
					</Button>
					{isLoggedIn ? (
							<>
								<Button color="inherit" component={NavLink} to="/writeBoard">
									Write
								</Button>
								<Button color="inherit" onClick={handleLogout}>
									Logout
								</Button>
								<Button color="inherit" component={NavLink} to={`/user/3`}>
									마이페이지
								</Button>

							</>
					) : (
							<>
								<Button color="inherit" component={NavLink} to="/login">
									Login
								</Button>
								<Button color="inherit" component={NavLink} to="/signup">
									SignUp
								</Button>
							</>
					)}
				</Toolbar>
			</AppBar>
	);
};

export default Nav;