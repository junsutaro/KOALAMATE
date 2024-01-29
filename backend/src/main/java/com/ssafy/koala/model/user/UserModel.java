package com.ssafy.koala.model.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.koala.model.RefrigeratorModel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id", nullable = false)
	private Long id;

	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String nickname;
	private double latitude;
	private double longitude;
	@Column(name="birth_range")
	private int birthRange;
	private String gender;
	private String profile;
	private boolean isAdmin;
	private String refreshToken;

	// 준수시치가 건든 부분
	@OneToOne
	@JoinColumn(name = "refrigerator_id")
	private RefrigeratorModel refrigerator;
}
