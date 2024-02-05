import React, { useState } from 'react';
import axios from 'axios';
import {
    Box, Typography, TextField, Button, InputLabel, Select, MenuItem, FormControl, List, ListItem, ListItemText
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const AddIngredient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [proportion, setProportion] = useState('');
    const [unit, setUnit] = useState('');
    const [cocktails, setCocktails] = useState([]);

    const fetchIngredients = async (search) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/drink/search?name=${search}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleSearchChange = (event, value) => {
        setSearchTerm(value);
        if (value) {
            fetchIngredients(value);
        } else {
            setSearchResults([]);
        }
    };

    const handleAddIngredient = () => {
        if (selectedIngredient && proportion && unit) {
            const newIngredient = {
                proportion: parseFloat(proportion),
                unit: unit,
                drink: {
                    id: selectedIngredient.id,
                    name: selectedIngredient.name,
                    category: selectedIngredient.category,
                }
            };
            setCocktails([...cocktails, newIngredient]);

            // Clear the input
            setSelectedIngredient(null);
            setProportion('');
            setUnit('');
        }
    };

    return (
        <Box m={1} p={4} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: 1,
            borderRadius: 2,
            borderColor: 'lightGray'
        }}>
            <Typography>재료</Typography>
            <Autocomplete
                freeSolo
                options={searchResults.map((option) => option.name)}
                value={searchTerm}
                onInputChange={handleSearchChange}
                onChange={(event, newValue) => {
                    const ingredient = searchResults.find(i => i.name === newValue);
                    setSelectedIngredient(ingredient);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="재료 이름을 검색해주세요" variant="outlined" />
                )}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth>
                    <TextField
                        label="용량"
                        type='number'
                        value={proportion}
                        onChange={(e) => setProportion(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id='unit-label'>단위</InputLabel>
                    <Select
                        labelId='unit-label'
                        label="단위"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <MenuItem value="ml">ml</MenuItem>
                        <MenuItem value="dash">dash</MenuItem>
                        <MenuItem value="teaspoon">teaspoon</MenuItem>
                        <MenuItem value="drops">drops</MenuItem>
                        <MenuItem value="gram">gram</MenuItem>
                        <MenuItem value="개">개</MenuItem>
                        <MenuItem value="slice">slice</MenuItem>
                        <MenuItem value="peel">peel</MenuItem>
                        <MenuItem value="leaves">leaves</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button variant="outlined" onClick={handleAddIngredient} sx={{ alignSelf: 'flex-end' }}>재료 추가</Button>
            {cocktails.map((ingredient, index) => (
                <List key={index} sx={{ mt: 2 }}>
                    <ListItem>
                        <ListItemText
                            primary={`재료 이름: ${ingredient.drink.name}, 용량: ${ingredient.proportion}, 단위: ${ingredient.unit}`}
                        />
                    </ListItem>
                </List>
            ))}
        </Box>
    );
}

export default AddIngredient;
