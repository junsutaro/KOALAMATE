import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainLayout from './Layout/MainLayout';
import {CssBaseline} from '@mui/material';
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<CssBaseline>
				<Router>
					<div className="App">
						<MainLayout />
					</div>
				</Router>
			</CssBaseline>
	);
}

export default App;