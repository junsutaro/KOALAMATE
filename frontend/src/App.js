import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Recipe from './pages/Recipe';
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/recipe" element={<Recipe/>} />
						{/* 다른 라우트들 */}
					</Routes>
				</div>
			</Router>
	);
}

export default App;