import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
	const [degree, setDegree] = React.useState('');
	const [ingredients, setIngredients] = React.useState('');
	const [base, setBase] = React.useState('');

	const handleDegreeChange = (event) => {
		setDegree(event.target.value);
	};

	const handleIngredientsChange = (event) => {
		setIngredients(event.target.value);
	};

	const handleBaseChange = (event) => {
		setBase(event.target.value);
	};

	return (
			<Container>
				<Grid container justifyContent='center' spacing={2}>
					<Grid item xs={12} sm={4}>
						<FormControl fullWidth>
							<InputLabel id="degree-label">도수</InputLabel>
							<Select
									labelId="degree-label"
									id="degree-select"
									value={degree}
									label="Degree"
									onChange={handleDegreeChange}
							>
								<MenuItem value={'non-alcoholic'}>무알콜</MenuItem>
								<MenuItem value={'low'}>낮은 도수</MenuItem>
								<MenuItem value={'high'}>높은 도수</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl fullWidth>
							<InputLabel id="ingredients-label">재료 수</InputLabel>
							<Select
									labelId="ingredients-label"
									id="ingredients-select"
									value={ingredients}
									label="Ingredients"
									onChange={handleIngredientsChange}
							>
								{Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
										<MenuItem key={num} value={num}>{num}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl fullWidth>
							<InputLabel id="base-label">베이스주</InputLabel>
							<Select
									labelId="base-label"
									id="base-select"
									value={base}
									label="Base"
									onChange={handleBaseChange}
							>
								<MenuItem value={'rum'}>럼</MenuItem>
								<MenuItem value={'vodka'}>보드카</MenuItem>
								<MenuItem value={'whiskey'}>위스키</MenuItem>
								<MenuItem value={'gin'}>진</MenuItem>
								<MenuItem value={'tequila'}>데킬라</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Container>
	);
}
