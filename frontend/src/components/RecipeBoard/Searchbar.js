import style from 'components/RecipeBoard/Searchbar.module.css';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar() {
	return (
			<div className={style.container}>
				<Input
						placeholder="레시피를 검색해보세요"
						startAdornment={<SearchIcon className={style.searchIcon} />}
				/>
				<button>검색</button>
			</div>
	);
}
