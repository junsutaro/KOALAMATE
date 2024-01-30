import React, { useEffect, useState } from 'react';

function Ranking() {
	// const [rankings, setRankings] = useState([]);

	// useEffect(() => {
	// 	const fetchRankings = async () => {
	// 		const data = await getRankings();
	// 		setRankings(data);
	// 	};

	// 	fetchRankings();
	// }, []);

	return (
			<div>
				<h4>🔥 지금 핫한 레시피 TOP10</h4>
				{/* rankings.map((item, index) => (
						<div key={index}>
							<h2>{index + 1}위: {item.name}</h2>
							<p>좋아요 수: {item.likes}</p>
						</div>
				)) */}
			</div>
	);
}

export default Ranking;
