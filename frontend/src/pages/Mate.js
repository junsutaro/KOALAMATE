import React, { useState } from 'react';
import Map from 'components/FindMate/Map';
import Matelist from 'components/FindMate/Matelist';

const Mate = () => {
	return (
			<div>
				<Matelist/>
				<h1>메이트 찾기</h1>
				<p>내 주변의 냉장고 & 메이트 찾기</p>
				{/*<Map/>*/}
			</div>
	);
}

export default Mate;