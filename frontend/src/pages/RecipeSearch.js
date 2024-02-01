import { useSearchParams } from "react-router-dom";
export default function RecipeSearch() {

	const [searchParams, setSearchParams] = useSearchParams()
	return <div>레시피 검색결과 페이지 {searchParams.get('q')}</div>;
}