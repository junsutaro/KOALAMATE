import React from 'react';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';

const Home = () => {
	return (
			<div>
				<h1>Home</h1>
				<Button color="inherit" component={NavLink} to="/writeBoard">
					write
				</Button>
				<p>Welcome to the home page of our website!</p>
			</div>
	);
};

export default Home;