import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import WriteBoard from './pages/WriteBoard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CommentList from './components/CommentList';
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<Router>
				<div className="App">
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/writeBoard" element={<WriteBoard />} />
						<Route path="/:boardId/comments" element={<CommentList />} />
						{/* 다른 라우트들 */}
					</Routes>
					<Footer />
				</div>
			</Router>
	);
}

export default App;