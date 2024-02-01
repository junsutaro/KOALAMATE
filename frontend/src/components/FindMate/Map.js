import React, { useEffect, useRef } from 'react';

function Map() {
	const mapContainer = useRef(null);

	useEffect(() => {
		const mapOption = {
			center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};

		// 지도를 표시할 div와 옵션으로 지도를 생성합니다
		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
	}, []);

	return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
}

export default Map;
