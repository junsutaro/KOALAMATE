package com.ssafy.koala.model.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class SignupRequest {
	//	@ApiModelProperty(required = true)
	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
	@NotNull
	String email; // 이메일 주소 형식 검증
	//	@ApiModelProperty(required = true)
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
	@NotNull
	String password; // 적어도 하나의 알파벳,숫자,특수문자가 포함되며 8자리 이상
	//	@ApiModelProperty(required = true)
	@Pattern(regexp = "^[a-zA-Z]{0,19}$")
	@NotNull
	String nickname; // 영문 대소문자 20자 미만

	int birthRange;
	int gender;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getBirthRange() {
		return birthRange;
	}

	public void setBirthRange(int birthRange) {
		this.birthRange = birthRange;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}
}
