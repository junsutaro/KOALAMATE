import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
	Menu,
	Tooltip, MenuItem, Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginStatus} from '../store/authSlice';
import logoImage from 'assets/logo.png';
import axios from 'axios';
import {useWebSocket} from 'context/WebSocketContext';
//import {useVoiceSocket} from 'context/VoiceSocketContext';
import {styled} from '@mui/material/styles';

const Nav = () => {
	const {isLoggedIn} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {disconnect} = useWebSocket();
	const [anchorEl, setAnchorEl] = useState(null); // 메뉴 상태 관리
	const [anchorElUser, setAnchorElUser] = useState(null); // 유저 메뉴 상태 관리
	const open = Boolean(anchorEl);
	const [menuOpen, setMenuOpen] = useState(false);
	//const {disconnectVoice} = useVoiceSocket();
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
		setMenuOpen(!menuOpen);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		try {
			console.log(`${process.env.REACT_APP_API_URL}`);
			await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, {}, {withCredentials: true});
			dispatch(setLoginStatus(false));
			disconnect();
			//disconnectVoice();
			navigate('/');
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

const handleMyPage = async () => {
	try {
		const authHeader = localStorage.getItem('authHeader');
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/myId`,
				{}, {
			headers: {
				'Authorization': authHeader,
			},
			withCredentials: true});
		console.log(res);
		navigate(`/user/${res.data}`);
	} catch (error) {
		console.log(error);
	}
}

	const NavButton = styled(Button)({
		margin: '0 20px',
		fontSize: '1rem',
		fontWeight: 700,
		letterSpacing: '.2rem',
		color: '#888',
		':hover': {
			color: '#000',
			backgroundColor: 'transparent',
		},
	});

	const settings = [
		{name: '마이페이지', action: handleMyPage},
		{name: '설정', path: '/settings'},
		{name: '로그아웃', action: handleLogout},
	];

	return (
			<AppBar position="static" sx={{backgroundColor: '#fff'}}>
				<Toolbar sx={{display: {xs: 'none', md: 'flex'}}}>
					<Box sx={{
						flexGrow: 1,
						display: {xs: 'none', md: 'flex'},
						alignItems: 'center',
						color: 'inherit',
						textDecoration: 'inherit',
					}}>
						<NavLink to="/" style={{
							display: 'flex',
							alignItems: 'center',
							color: 'inherit',
							textDecoration: 'inherit',
						}}>
							<img src={logoImage} alt="Logo" style={{maxHeight: '70px'}}/>
							{/*<Box sx={{ flexGrow: 0, flexShrink: 0, display: { xs: 'none', lg: 'flex' } }}>*/}
							{/*	<Typography variant="h6" noWrap sx={{ ml: 2, fontWeight: 700, letterSpacing: '.2rem' }}>*/}
							{/*		코알라 친구찾기*/}
							{/*	</Typography>*/}
							{/*</Box>*/}
						</NavLink>
					</Box>
					<Box sx={{display: {xs: 'none', md: 'flex'}, ...(isLoggedIn && { flexGrow: 1})}}>
						<NavButton color="inherit" component={NavLink}
						        to="/1/comments" sx={{ mr: 2 }}>Comments</NavButton>
						<NavButton color="inherit" component={NavLink}
						        to="/recipe" sx={{ mr: 2 }}>레시피</NavButton>
						{isLoggedIn ? (
								<>
									<NavButton color="inherit" component={NavLink}
									        to="/writeBoard">Write</NavButton>
								</>
						) : (
								<>
									<NavButton color="inherit" component={NavLink}
									        to="/login" sx={{ mr: 2 }}>Login</NavButton>
									<NavButton color="inherit" component={NavLink}
									        to="/signup">SignUp</NavButton>
								</>
						)}
					</Box>
					{isLoggedIn && (
							<Box sx={{ flexGrow: 0, display: 'flex'}}>
								{/*Profile Image*/}
								<Box sx={{flexGrow: 0}}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
											<Avatar alt="Remy Sharp"
											        src="/static/images/avatar/2.jpg"/>
										</IconButton>
									</Tooltip>
									<Menu
											sx={{mt: '45px'}}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
									>
										{settings.map((setting) => (
												<MenuItem key={setting.name} onClick={setting.action
														? setting.action
														: handleCloseUserMenu}>
													{setting.path ? (
															<NavLink to={setting.path} style={{
																textDecoration: 'none',
																color: 'inherit',
																width: '100%',
															}}>
																<Typography
																		textAlign="center">{setting.name}</Typography>
															</NavLink>
													) : (
															<Typography textAlign="center"
															            style={{width: '100%'}}>{setting.name}</Typography>
													)}
												</MenuItem>
										))}
									</Menu>
								</Box>
							</Box>
					)
					}

				</Toolbar>
				<Toolbar sx={{display: {xs: 'flex', md: 'none'}}}>
					<Box sx={{display: {xs: 'flex', md: 'none'}}}>
						<Box sx={{
							flexGrow: 1,
							display: {xs: 'flex', md: 'none'},
							alignItems: 'center',
							color: 'inherit',
							textDecoration: 'inherit',
						}}>
							<NavLink to="/" style={{
								display: 'flex',
								alignItems: 'center',
								color: 'inherit',
								textDecoration: 'inherit',
							}}>
								<img src={logoImage} alt="Logo" style={{maxHeight: '50px'}}/>
								<Typography variant="h6" noWrap sx={{
									ml: 2,
									display: {xs: 'none', lg: 'flex'},
									fontWeight: 700,
									letterSpacing: '.2rem',
								}}>
									코알라 친구찾기
								</Typography>
							</NavLink>
						</Box>
						<IconButton size="large" aria-label="menu"
						            aria-controls="menu-appbar"
						            aria-haspopup="true" onClick={handleMenu}
						            color="inherit">
							<MenuIcon/>
						</IconButton>
						<Collapse in={menuOpen}>
							<Box sx={{
								display: {xs: 'flex', md: 'none'},
								flexDirection: 'column',
								alignItems: 'center',
								pb: 2,
							}}>
								<NavButton color="inherit" component={NavLink} to="/about"
								        onClick={() => setMenuOpen(false)}>About</NavButton>
								<NavButton color="inherit" component={NavLink} to="/1/comments"
								        onClick={() => setMenuOpen(false)}>Comments</NavButton>
								<NavButton color="inherit" component={NavLink} to="/recipe"
								        onClick={() => setMenuOpen(false)}>Recipe</NavButton>
								{isLoggedIn ? (
										<>
											<NavButton color="inherit" component={NavLink}
											        to="/writeBoard"
											        onClick={() => setMenuOpen(false)}>Write</NavButton>
											<NavButton color="inherit"
											        onClick={handleLogout}>Logout</NavButton>
										</>
								) : (
										<>
											<NavButton color="inherit" component={NavLink} to="/login"
											        onClick={() => setMenuOpen(false)}>Login</NavButton>
											<NavButton color="inherit" component={NavLink} to="/signup"
											        onClick={() => setMenuOpen(false)}>SignUp</NavButton>
										</>
								)}
							</Box>
						</Collapse>
						{/*<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} onClose={handleClose}>*/}
						{/*	<MenuItem onClick={handleClose} component={NavLink} to="/about">About</MenuItem>*/}
						{/*	<MenuItem onClick={handleClose} component={NavLink} to="/1/comments">Comments</MenuItem>*/}
						{/*	<MenuItem onClick={handleClose} component={NavLink} to="/recipe">Recipe</MenuItem>*/}
						{/*	{isLoggedIn ? (*/}
						{/*			<>*/}
						{/*				<MenuItem onClick={handleClose} component={NavLink} to="/writeBoard">Write</MenuItem>*/}
						{/*				<MenuItem onClick={handleLogout}>Logout</MenuItem>*/}
						{/*			</>*/}
						{/*	) : (*/}
						{/*			<>*/}
						{/*				<MenuItem onClick={handleClose} component={NavLink} to="/login">Login</MenuItem>*/}
						{/*				<MenuItem onClick={handleClose} component={NavLink} to="/signup">SignUp</MenuItem>*/}
						{/*			</>*/}
						{/*	)}*/}
						{/*</Menu>*/}
					</Box>
				</Toolbar>
			</AppBar>
	);
};

export default Nav;