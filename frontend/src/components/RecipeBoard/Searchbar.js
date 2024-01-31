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

import React from 'react';
import styles from './Searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
	return (
			<div className={styles.searchContainer}>
				<SearchIcon className={styles.searchIcon} />
				<input
						className={styles.searchInput}
						placeholder="레시피를 검색해보세요"
				/>
				<button className={styles.searchButton}>검색</button>
			</div>
	);
};

export default Searchbar;

