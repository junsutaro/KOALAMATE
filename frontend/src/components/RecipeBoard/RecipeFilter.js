import  React, { useState }  from 'react';
import { FormControl, InputLabel, Select, MenuItem, Container, Grid, IconButton,  InputAdornment  } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function RecipeFilter({onCategoryChange}) {
    // const [degree, setDegree] = React.useState('');
    // const handleDegreeChange = (event) => {
    // 	setDegree(event.target.value);
    // };
    const [ingredients, setIngredients] = React.useState('');
    const handleIngredientsChange = (event) => {
        setIngredients(event.target.value);
    };


    const [base, setBase] = React.useState('');
    const categories = [
        '무알콜',
        '진',
        '럼',
        '보드카',
        '위스키',
        '데킬라',
        '브랜디',
        '리큐르',
        '맥주',
        '소주',
    ];

    const handleBaseChange = (event) => {
        const selectedCategory = event.target.value
        setBase(selectedCategory);
        onCategoryChange(selectedCategory); // 부모 컴포넌트에 선택된 카테고리 전달
    };

    const handleClearCategory = () => {
        setBase('');
        onCategoryChange(null);
    };


    return (
        <Container>
            <Grid container justifyContent='center' spacing={2}>
                {/*<Grid item xs={12} sm={4}>*/}
                {/*	<FormControl fullWidth>*/}
                {/*		<InputLabel id="degree-label">도수</InputLabel>*/}
                {/*		<Select*/}
                {/*				labelId="degree-label"*/}
                {/*				id="degree-select"*/}
                {/*				value={degree}*/}
                {/*				label="Degree"*/}
                {/*				onChange={handleDegreeChange}*/}
                {/*		>*/}
                {/*			<MenuItem value={'non-alcoholic'}>무알콜</MenuItem>*/}
                {/*			<MenuItem value={'low'}>낮은 도수</MenuItem>*/}
                {/*			<MenuItem value={'high'}>높은 도수</MenuItem>*/}
                {/*		</Select>*/}
                {/*	</FormControl>*/}
                {/*</Grid>*/}
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
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="base-label">베이스주</InputLabel>
                        <Select
                            labelId="base-label"
                            id="base-select"
                            value={base}
                            onChange={handleBaseChange}
                            label="Base"
                            endAdornment={
                                (base !== null && base !== '') ? (
                                    <InputAdornment position="end" style={{ marginRight: '20px' }}>
                                        <IconButton
                                            onClick={handleClearCategory}
                                            edge="end"
                                        >
                                            <HighlightOffOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            }
                        >
                            {categories.map((label, index) => (
                                <MenuItem key={index} value={index}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}