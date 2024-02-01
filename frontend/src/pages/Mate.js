import React, { useState } from 'react';
import Map from 'components/FindMate/Map'
import Sidebar from 'components/FindMate/Sidebar'
const Mate = () => {
	return (
			<div>
				<Sidebar/>
				<h1>메이트 찾기</h1>
				<p>내 주변의 냉장고 & 메이트 찾기</p>
				<Map/>
			</div>
	);
}

export default Mate;