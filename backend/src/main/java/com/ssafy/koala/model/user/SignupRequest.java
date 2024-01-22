package com.ssafy.koala.model.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class SignupRequest {
	//	@ApiModelProperty(required = true)
	@NotNull
	String email;
	//	@ApiModelProperty(required = true)
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
	@NotNull
	String password;
	//	@ApiModelProperty(required = true)
	@Pattern(regexp = "^[a-zA-Z]{0,19}$")
	@NotNull
	String nickname; // 영문 대소문자 20자 미만

	String birthRange;
	String phone;

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

	public String getBirthRange() {
		return birthRange;
	}

	public void setBirthRange(String birthRange) {
		this.birthRange = birthRange;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
