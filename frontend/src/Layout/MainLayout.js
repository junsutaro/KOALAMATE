import React, { useState } from 'react';
import {
	Drawer,
	Button,
	List,
	ListItem,
	ListItemText,
	Box,
	IconButton,
	Divider,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import WriteBoard from '../pages/WriteBoard';
import CommentList from '../components/Comment/CommentList';
import Footer from '../components/Footer';
import Chattings from '../components/Chattings';
import Toolbar from '@mui/material/Toolbar';
import Recipe from '../pages/Recipe';
import RecipeDetail from '../pages/RecipeDetail';
import Chatting from '../components/Chatting';
import MyPage from '../pages/MyPage';
import FollowerList from '../pages/FollowerList';
import FolloweeList from '../pages/FolloweeList';
import UpdateMyPage from '../pages/UpdateMyPage';
import Fridge from '../components/Fridge/Fridge';

const MainLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isLoggedIn } = useSelector(state => state.auth);

	const toggleDrawer = (open) => {
		console.log("toggleDrawer: ", open);
		setIsOpen(open);
	};

	return (
			<Box sx={{ transition: 'margin 0.3s ease-out', marginRight: isLoggedIn && isOpen ? '350px' : 0 }}>
				{isLoggedIn && !isOpen && (
						<IconButton onClick={() => toggleDrawer(true)} sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1300 }}>
							<ChatIcon />
						</IconButton>
				)}

				{isLoggedIn && (
						<Drawer variant={'persistent'} anchor="right" open={isOpen} onClose={() => toggleDrawer(false)} >
							<Toolbar>
								<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
									Chattings
								</Typography>
								<IconButton onClick={() => toggleDrawer(false)} >
									<CloseIcon />
								</IconButton>
							</Toolbar>
							<Divider />
							<Box sx={{ width: 350 }} role="presentation">
								{isOpen && (<Chattings />)}
							</Box>
						</Drawer>
				)}

				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />

					<Route path="/recipe" element={<Recipe/>} />
					{/*<Route path="/recipe/search" element={<Search/>}/>*/}
					<Route path="/recipe/:boarId" component={RecipeDetail} />

					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/writeBoard" element={<WriteBoard />} />
					<Route path="/:boardId/comments" element={<CommentList />} />
					<Route path="/user/:userId" element={<MyPage />} />
					<Route path="/user/:userId/update" element={<UpdateMyPage />} />
					{/*<Route path="/user/:userId/update" element={<WriteMyPage />} />*/}
					<Route path="/user/:userId/follower" element={<FollowerList />} />
					<Route path="/user/:userId/followee" element={<FolloweeList />} />
					<Route path="/fridge" element={<Fridge />} />
					{/* 다른 라우트들 */}
				</Routes>
				<Footer />
			</Box>
	);
};

export default MainLayout;
