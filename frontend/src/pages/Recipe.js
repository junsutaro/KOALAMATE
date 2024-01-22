import React from 'react';
import Nav from 'components/Nav';
import { Button, ButtonGroup, TextField } from '@mui/material';
const Recipe = () => {
	return (
			<div>
				<Nav/>
				<h1>레시피 조회 페이지</h1>
				<p></p>
				<ButtonGroup variant="outlined" aria-label="outlined button group">
					<Button> 전체 조회 </Button>
					<Button> 레시피 백과 </Button>
					<Button> 유저 레시피 </Button>
				</ButtonGroup>

				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
				<hr/>
			</div>
	);
}

export default Recipe;