package com.ssafy.koala.controller;

//import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.TokenResponse;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@Tag(name="user", description="user controller")
public class UserController {
	private final UserService userService;

	public UserController (UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public Object login(@RequestBody UserDto user, HttpServletResponse response) {
		Map<String, Object> userInfo = userService.auth(user);
		if(userInfo == null) {
			return ResponseEntity.status(401).body("로그인 실패");
		}
		TokenResponse tokens = (TokenResponse) userInfo.get("tokens");
		Cookie cookie = new Cookie("refresh_token", tokens.getRefreshToken());

		cookie.setMaxAge(7*24*60*60); // 7일
		cookie.setHttpOnly(true);
		cookie.setPath("/");

		Map<String, Object> resultMap = new HashMap<>();
		UserDto storedUser = (UserDto) userInfo.get("user");
		resultMap.put("email", storedUser.getEmail()); // 이메일 반환
		resultMap.put("nickname", storedUser.getNickname()); // 닉네임 반환

		// 헤더에 accessToken 추가
		response.addHeader("Authorization", "Bearer " + tokens.getAccessToken());
		response.addCookie(cookie); // 쿠키에 refreshToken 추가
		return ResponseEntity.ok(resultMap);
	}

	@PostMapping("/signup")
//	@ApiOperation(value = "가입하기") // swagger api 명세내용
	public Object signup(@Valid @RequestBody UserDto request) {
		ResponseEntity response = null;

		Optional<UserDto> userOpt = Optional.empty();

		userOpt = userService.findUserByNicknameOrEmail(request.getNickname(), request.getEmail());
		System.out.println(request.getEmail() + " " + request.getNickname());

		if (userOpt.isEmpty()) {
			UserDto newUser = new UserDto();
			BeanUtils.copyProperties(request, newUser);

			userService.save(newUser);

			response = new ResponseEntity<>(newUser, HttpStatus.CREATED);
		} else {
			response = new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return response;
	}

	// httponly 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletResponse response) {
		// refreshToken을 db에서 가져와야함
		Cookie cookie = new Cookie("refreshToken", null);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(0); // 쿠키를 즉시 만료시킵니다.
		response.addCookie(cookie);
		return ResponseEntity.ok().build();
	}
}