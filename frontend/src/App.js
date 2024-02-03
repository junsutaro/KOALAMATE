import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Home from './pages/Home';
import About from './pages/About';
import Recipe from './pages/Recipe';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import WriteBoard from './pages/WriteBoard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CommentList from './components/Comment/CommentList';
import Chatting from './components/Chatting'
import MyPage from './pages/MyPage';
import WriteMyPage from './pages/UpdateMyPage';
import FollowerList from './pages/FollowerList';
import FolloweeList from './pages/FolloweeList';
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<Router>
				<div className="App">
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
						<Route path="chatting" element={<Chatting />} />
						<Route path="/user/:userId" element={<MyPage />} />
						<Route path="/user/:userId/update" element={<WriteMyPage />} />
						<Route path="/user/:userId/follower" element={<FollowerList />} />
						<Route path="/user/:userId/followee" element={<FolloweeList />} />
						{/* 다른 라우트들 */}
					</Routes>
					<Footer />
				</div>
			</Router>
	);
}

export default App;