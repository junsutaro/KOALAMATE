// import style from 'components/RecipeBoard/Searchbar.module.css';
// import Input from '@mui/material/Input';
// import SearchIcon from '@mui/icons-material/Search';
//
// export default function Searchbar() {
// 	return (
// 			<div className={style.container}>
// 				<Input
// 						placeholder="레시피를 검색해보세요"
// 						startAdornment={<SearchIcon className={style.searchIcon} />}
// 				/>
// 				<button>검색</button>
// 			</div>
// 	);
// }

import React, {useState} from 'react';
import styles from './Searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


const Searchbar = ({ onSearch }) => {
	const [term, setTerm] = useState('');

	const handleSearch = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/drink/search?name=${term}`);
			onSearch(response.data); // 상위 컴포넌트로 검색 결과 전달
		} catch (error) {
			console.error('검색 중 오류 발생:', error);
		}
	};

	return (
		<div className={styles.searchContainer}>
			<SearchIcon className={styles.searchIcon} />
			<input
				className={styles.searchInput}
				placeholder="레시피를 검색해보세요"
				value={term}
				onChange={(e) => setTerm(e.target.value)}
			/>
			<button className={styles.searchButton} onClick={handleSearch}>검색</button>
		</div>
	);
};

export default Searchbar;


