import React, { Component } from "react";
import Slider from "react-slick";
import styles from './SimpleSlider.module.css'; // CSS 모듈 임포트
import "slick-carousel/slick/slick.css"; // 기본 슬릭 CSS
import "slick-carousel/slick/slick-theme.css"; // 테마 CSS

export default class SimpleSlider extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
		};
		return (
				<div className={styles.sliderContainer}>
					<Slider {...settings}>
						<div className={styles.slide}>1</div>
						<div className={styles.slide}>2</div>
						<div className={styles.slide}>3</div>
					</Slider>
				</div>
		);
	}
}
