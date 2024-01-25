import style from 'components/Searchbar.module.css'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


export default function Searchbar () {
	return <div className={style.container}>
		<input/>
		<button>검색</button>
		<SearchIcon></SearchIcon>
	</div>
}
