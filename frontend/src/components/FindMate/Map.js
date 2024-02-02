import React, { useEffect, useRef } from 'react';
import refrig from 'assets/refrig_map.png'; // 기본 마커 이미지


function Map() {
	const mapContainer = useRef(null);

	useEffect(() => {
		const mapOption = {
			center: new window.kakao.maps.LatLng(37.5665, 126.9780),
			level: 3
		};

		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

		// 기본 마커 이미지 설정
		const normalImage = new window.kakao.maps.MarkerImage(
				refrig,
				new window.kakao.maps.Size(65, 70),
				{ offset: new window.kakao.maps.Point(27, 69) }
		);

		// 마우스오버 시 마커 이미지 설정
		const overImage = new window.kakao.maps.MarkerImage(
				refrig,
				new window.kakao.maps.Size(75, 80),
				{ offset: new window.kakao.maps.Point(27, 69) }
		);

		const positions = [
			{ lat: 37.5675, lng: 126.9785 },
			{ lat: 37.5655, lng: 126.9765 },
			{ lat: 37.5645, lng: 126.9795 },
			{ lat: 37.5665, lng: 126.9775 }
		];

		positions.forEach((position) => {
			const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
				image: normalImage
			});

			marker.setMap(map);

			// 마커에 mouseover 이벤트를 등록합니다
			window.kakao.maps.event.addListener(marker, 'mouseover', function() {
				marker.setImage(overImage);
			});

			// 마커에 mouseout 이벤트를 등록합니다
			window.kakao.maps.event.addListener(marker, 'mouseout', function() {
				marker.setImage(normalImage);
			});
		});
	}, []);

	return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
}

export default Map;

