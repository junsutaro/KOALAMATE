// import React, { useEffect, useRef } from 'react';
// import refrig from 'assets/refrig_map.png'; // 기본 마커 이미지 경로
// import style from 'components/FindMate/Map.module.css';
//
// function Map() {
// 	const mapContainer = useRef(null);
//
// 	useEffect(() => {
// 		// 위치 정보 활용 동의
// 		const confirmLocationAccess = window.confirm("위치 정보 활용에 동의하고 내 주변 냉장고를 찾아볼까요?");
//
// 		if (!confirmLocationAccess) {
// 			console.log("위치 정보 활용에 동의하지 않았습니다.");
// 			// 동의하지 않았을 경우에도 기본 위치로 지도 초기화
// 			initializeMap(36.1081844, 128.4139686);
// 			return;
// 		}
//
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition((position) => {
// 				const { latitude, longitude } = position.coords;
// 				initializeMap(latitude, longitude);
// 				console.log(latitude + " " + longitude);
// 			}, () => {
// 				console.error("위치 정보를 가져올 수 없습니다.");
// 				initializeMap(36.1081844, 128.4139686);
// 			});
// 		} else {
// 			console.log("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
// 			initializeMap(36.1081844, 128.4139686);
// 		}
// 	},
// 		{
// 			enableHighAccuracy: true, // 더 높은 정확도 활성화
// 			timeout: 10000, // 10초 내에 위치 정보를 가져오지 못하면 에러
// 			maximumAge: 0 // 캐시된 위치 정보 사용 안 함
// 		});
//
// 	const initializeMap = (lat, lng) => {
// 		const mapOption = {
// 			center: new window.kakao.maps.LatLng(lat, lng),
// 			level: 3
// 		};
//
// 		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
//
// 		const normalImage = new window.kakao.maps.MarkerImage(
// 				refrig,
// 				new window.kakao.maps.Size(65, 70),
// 				{ offset: new window.kakao.maps.Point(27, 69) }
// 		);
//
// 		const overImage = new window.kakao.maps.MarkerImage(
// 				refrig,
// 				new window.kakao.maps.Size(75, 80),
// 				{ offset: new window.kakao.maps.Point(27, 69) }
// 		);
//
// 		const markerPosition = new window.kakao.maps.LatLng(lat, lng);
// 		const marker = new window.kakao.maps.Marker({
// 			position: markerPosition,
// 			image: normalImage
// 		});
//
// 		marker.setMap(map);
//
// 		window.kakao.maps.event.addListener(marker, 'mouseover', function() {
// 			marker.setImage(overImage);
// 		});
//
// 		window.kakao.maps.event.addListener(marker, 'mouseout', function() {
// 			marker.setImage(normalImage);
// 		});
//
// 		// // 커스텀 오버레이에 표출될 내용
// 		// var content = `<div class="${style.customoverlay}">` + // CSS 모듈의 클래스 이름 사용
// 		// 		'<a href="https://map.kakao.com/" target="_blank">' +
// 		// 		'<span class="title">닉네임</span>' + // 'title' 클래스도 CSS 모듈을 통해 관리해야 한다면 같은 방식으로 적용
// 		// 		'</a>' +
// 		// 		'</div>';
// 		//
// 		// // 커스텀 오버레이를 생성합니다
// 		// var customOverlay = new window.kakao.maps.CustomOverlay({
// 		// 	map: map,
// 		// 	position: markerPosition,
// 		// 	content: content,
// 		// 	yAnchor: 1
// 		// });
// 	};
//
// 	return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
// }
//
// export default Map;

import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import refrig from 'assets/refrig_map.png'; // 기본 마커 이미지 경로
import style from 'components/FindMate/Map.module.css';


function Map() {
	const mapContainer = useRef(null);
	const [userData, setUserData] = useState([]);
	const navigate = useNavigate(); // useNavigate 사용

	useEffect(() => {
		const confirmLocationAccess = window.confirm("위치 정보 활용에 동의하고 내 주변 냉장고를 찾아볼까요?");
		if (!confirmLocationAccess) {
			console.log("위치 정보 활용에 동의하지 않았습니다.");
			return;
		}

		const fetchUserData = async () => {
			try {
				const response = await axios.get("http://localhost:8085/findmate/listMate", {
					headers: {
						'Authorization': localStorage.getItem('authHeader')
					}
				});
				setUserData(response.data);
			} catch (error) {
				console.error("유저 데이터를 가져오는 중 오류 발생", error);
			}
		};

		fetchUserData();
	}, []);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				initializeMap(position.coords.latitude, position.coords.longitude);
			}, () => {
				console.error("위치 정보를 가져올 수 없습니다.");
				initializeMap(36.1081844, 128.4139686); // 기본 위치
			});
		} else {
			console.log("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
			initializeMap(36.1081844, 128.4139686); // 기본 위치
		}
	}, [userData]); // 유저 데이터가 변경될 때마다 지도 초기화

	const initializeMap = (lat, lng) => {
		const mapOption = {
			center: new window.kakao.maps.LatLng(lat, lng),
			level: 3
		};

		const map = new window.kakao.maps.Map(mapContainer.current, mapOption);


		// 유저 데이터를 사용하여 각 위치에 커스텀 마커 추가
		userData.forEach(user => {
			console.log(user);
			const markerPosition = new window.kakao.maps.LatLng(user.latitude, user.longitude);
			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
				image: new window.kakao.maps.MarkerImage(
					refrig,
					new window.kakao.maps.Size(65, 70),
					{ offset: new window.kakao.maps.Point(27, 69) }
				)
			});

			marker.setMap(map);

			// 마커에 마우스 오버/아웃 이벤트 추가
			window.kakao.maps.event.addListener(marker, 'mouseover', function() {
				marker.setImage(new window.kakao.maps.MarkerImage(
					refrig,
					new window.kakao.maps.Size(75, 80),
					{ offset: new window.kakao.maps.Point(27, 69) }
				));
			});

			window.kakao.maps.event.addListener(marker, 'mouseout', function() {
				marker.setImage(new window.kakao.maps.MarkerImage(
					refrig,
					new window.kakao.maps.Size(65, 70),
					{ offset: new window.kakao.maps.Point(27, 69) }
				));
			});

			// 마커 클릭 이벤트 추가
			window.kakao.maps.event.addListener(marker, 'click', function() {
				console.log(`Navigating to /fridge/${user.id}`); // userId 값 확인
				navigate(`/fridge/${user.id}`); // 사용자 ID를 사용하여 경로 이동
			});
		});
	};

	return <div ref={mapContainer} className={style.mapContainer} />;
}

export default Map;
