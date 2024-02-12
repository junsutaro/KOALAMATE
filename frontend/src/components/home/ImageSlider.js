import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ImageSlider.css";

const ImageSlider = () => {
  const images = [
    // 슬라이더 이미지 경로 배열
    {src: "img-banner1.svg", path: localStorage.getItem('authHeader')? "/recipe" : "/login"},
    {src: "img-banner2.svg", path: localStorage.getItem('authHeader')? "/mate" : "/login"},
    {src: "img-banner3.svg", path: localStorage.getItem('authHeader')? "/recipe" : "/login"},
  ];
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const authHeader = localStorage.getItem('authHeader');
    return authHeader ? { Authorization: authHeader } : {};
  };

  const settings = {
    dots: true, // 점 페이징 표시 여부
    infinite: true, // 무한 루프
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 스크롤할 슬라이드 개수
    autoplay: true, // 자동 재생 사용
    autoplaySpeed: 5000, // 자동 재생 속도
    cssEase: "linear" // 전환 효과
  };

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (imagePath) => {
    navigate(imagePath); // 원하는 경로로 이동
  };

  return (
    <Slider {...settings}>
      {images.map((image, idx) => (
        <div key={idx} onClick={() => handleImageClick(image.path)}>
          <img src={image.src} alt={`Slide ${idx}`} style={{ width: '100%'}}/>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;