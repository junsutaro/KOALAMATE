import React from 'react';
import Nav from 'components/Nav';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

const Home = () => {
	return (
			<div>
				<Nav/>
				<h1>Home</h1>
				<Button color="inherit" component={NavLink} to="/writeBoard">
					write
				</Button>
				<p>Welcome to the home page of our website!</p>
			</div>
	);
};

export default Home;