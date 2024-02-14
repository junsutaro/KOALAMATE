import React, { useState } from 'react';
import Map from 'components/FindMate/Map';
import Matelist from 'components/FindMate/MapDrawer';
import {MapProvider} from 'context/MapContext';

const Mate = () => {
	return (
		<MapProvider>
			<div>
				<h1>메이트 찾기</h1>
				<p>내 주변의 냉장고 & 메이트 찾기</p>
				<Matelist />
				<Map />
			</div>
		</MapProvider>
	);
}

export default Mate;