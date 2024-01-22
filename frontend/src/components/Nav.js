import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Nav = () => {
	return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						My App
					</Typography>
					<Button color="inherit" component={NavLink} to="/" exact>
						Home
					</Button>
					<Button color="inherit" component={NavLink} to="/about">
						About
					</Button>
					<Button color="inherit" component={NavLink} to="/contact">
						Contact
					</Button>
				</Toolbar>
			</AppBar>
	);
};

export default Nav;