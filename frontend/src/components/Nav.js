import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginStatus} from '../store/authSlice';

const Nav = () => {
	const { isLoggedIn } = useSelector(state => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			//await axios.post('/user/logout', {}, {withCredentials: true});
			dispatch(setLoginStatus(false));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }} component={NavLink} to="/">
						My App
					</Typography>
					<Button color="inherit" component={NavLink} to="/about">
						About
					</Button>
					{isLoggedIn ? (
							<>
								<Button color="inherit" component={NavLink} to="/writeBoard">
									Write
								</Button>
								<Button color="inherit" onClick={handleLogout}>
									Logout
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