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
import Chatting from './pages/Chatting';
import SlideIn from './components/SlideIn';
import MainLayout from './Layout/MainLayout';
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<Router>
				<div className="App">
					<MainLayout />
				</div>
			</Router>
	);
}

export default App;