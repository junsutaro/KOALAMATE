package com.ssafy.koala.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String email;
	private String password;
//	private String nickname;
//	private double latitude;
//	private double longitude;
//	@Column(name="birth_range")
//	private int birthRange;
//	private int gender;
//	private String profile;
//	private boolean isAdmin;
}
