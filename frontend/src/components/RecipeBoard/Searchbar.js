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


const Searchbar = ({onSearch, setIsSearch}) => {
    const [term, setTerm] = useState('');
    const pageNum = 1
    const sizeNum = 8
    const optionNum = 1

    // console.log("optionNum", optionNum)

    const handleSearch = async () => {
        setIsSearch(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/board/search?page=${pageNum}&size=${sizeNum}&keyword=${term}&option=${optionNum}`);
            console.log(response.data.content)
            onSearch(response.data.content, response.data.totalPages); // 상위 컴포넌트로 검색 결과 전달
            // setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon}/>
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


