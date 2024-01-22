package com.ssafy.koala.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;

@Data
// 객체와 DB를 연결하는 유저정보 Entity 클래스
public class UserDto {
	private String email;
	private String password;
//	private String nickname;
//	private double latitude;
//	private double longitude;
//	@Column(name="birth_range")
//	private String birthRange;
//	private String phone;
//	private String profile;
//	private boolean isAdmin;

	// 나중에 외래키 쓸 entity 추가해야함

}
