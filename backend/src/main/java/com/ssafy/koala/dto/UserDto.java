package com.ssafy.koala.dto;

import lombok.Data;

@Data
public class UserDto {
	private String email;
	private String password;
	private String nickname;
	private double latitude;
	private double longitude;
	private int birthRange;
	private int gender;
	private String profile;
	private boolean isAdmin;
}
