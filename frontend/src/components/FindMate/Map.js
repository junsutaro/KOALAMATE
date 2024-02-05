// import React, { useEffect, useRef } from 'react';
// import refrig from 'assets/refrig_map.png'; // 기본 마커 이미지
//
//
// function Map() {
// 	const mapContainer = useRef(null);
//
// 	useEffect(() => {
// 		const mapOption = {
// 			center: new window.kakao.maps.LatLng(37.5665, 126.9780),
// 			level: 3
// 		};
//
// 		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
//
// 		// 기본 마커 이미지 설정
// 		const normalImage = new window.kakao.maps.MarkerImage(
// 				refrig,
// 				new window.kakao.maps.Size(65, 70),
// 				{ offset: new window.kakao.maps.Point(27, 69) }
// 		);
//
// 		// 마우스오버 시 마커 이미지 설정
// 		const overImage = new window.kakao.maps.MarkerImage(
// 				refrig,
// 				new window.kakao.maps.Size(75, 80),
// 				{ offset: new window.kakao.maps.Point(27, 69) }
// 		);
//
// 		const positions = [
// 			{ lat: 37.5675, lng: 126.9785 },
// 			{ lat: 37.5655, lng: 126.9765 },
// 			{ lat: 37.5645, lng: 126.9795 },
// 			{ lat: 37.5665, lng: 126.9775 }
// 		];
//
// 		positions.forEach((position) => {
// 			const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
// 			const marker = new window.kakao.maps.Marker({
// 				position: markerPosition,
// 				image: normalImage
// 			});
//
// 			marker.setMap(map);
//
// 			// 마커에 mouseover 이벤트를 등록합니다
// 			window.kakao.maps.event.addListener(marker, 'mouseover', function() {
// 				marker.setImage(overImage);
// 			});
//
// 			// 마커에 mouseout 이벤트를 등록합니다
// 			window.kakao.maps.event.addListener(marker, 'mouseout', function() {
// 				marker.setImage(normalImage);
// 			});
// 		});
// 	}, []);
//
// 	return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
// }
//
// export default Map;
//

import React, { useEffect, useRef } from 'react';
import refrig from 'assets/refrig_map.png'; // 기본 마커 이미지 경로
import style from 'components/FindMate/Map.module.css';

function Map() {
	const mapContainer = useRef(null);

	useEffect(() => {
		// 위치 정보 활용 동의
		const confirmLocationAccess = window.confirm("위치 정보 활용에 동의하고 내 주변 냉장고를 찾아볼까요?");

		if (!confirmLocationAccess) {
			console.log("위치 정보 활용에 동의하지 않았습니다.");
			// 동의하지 않았을 경우에도 기본 위치로 지도 초기화
			initializeMap(36.1081844, 128.4139686);
			return;
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				initializeMap(latitude, longitude);
				console.log(latitude + " " + longitude);
			}, () => {
				console.error("위치 정보를 가져올 수 없습니다.");
				initializeMap(36.1081844, 128.4139686);
			});
		} else {
			console.log("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
			initializeMap(36.1081844, 128.4139686);
		}
	},
		{
			enableHighAccuracy: true, // 더 높은 정확도 활성화
			timeout: 10000, // 10초 내에 위치 정보를 가져오지 못하면 에러
			maximumAge: 0 // 캐시된 위치 정보 사용 안 함
		});

	const initializeMap = (lat, lng) => {
		const mapOption = {
			center: new window.kakao.maps.LatLng(lat, lng),
			level: 3
		};

		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

		const normalImage = new window.kakao.maps.MarkerImage(
				refrig,
				new window.kakao.maps.Size(65, 70),
				{ offset: new window.kakao.maps.Point(27, 69) }
		);

		const overImage = new window.kakao.maps.MarkerImage(
				refrig,
				new window.kakao.maps.Size(75, 80),
				{ offset: new window.kakao.maps.Point(27, 69) }
		);

		const markerPosition = new window.kakao.maps.LatLng(lat, lng);
		const marker = new window.kakao.maps.Marker({
			position: markerPosition,
			image: normalImage
		});

		marker.setMap(map);

		window.kakao.maps.event.addListener(marker, 'mouseover', function() {
			marker.setImage(overImage);
		});

		window.kakao.maps.event.addListener(marker, 'mouseout', function() {
			marker.setImage(normalImage);
		});

		// 커스텀 오버레이에 표출될 내용
		var content = `<div class="${style.customoverlay}">` + // CSS 모듈의 클래스 이름 사용
				'<a href="https://map.kakao.com/" target="_blank">' +
				'<span class="title">닉네임</span>' + // 'title' 클래스도 CSS 모듈을 통해 관리해야 한다면 같은 방식으로 적용
				'</a>' +
				'</div>';

		// 커스텀 오버레이를 생성합니다
		var customOverlay = new window.kakao.maps.CustomOverlay({
			map: map,
			position: markerPosition,
			content: content,
			yAnchor: 1
		});
	};

	return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
}

export default Map;
