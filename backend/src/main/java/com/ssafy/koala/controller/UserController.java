package com.ssafy.koala.controller;

//import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.TokenResponse;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	public Object login(@RequestBody UserDto user) {
		TokenResponse tokens = this.userService.auth(user);
		return ResponseEntity.ok(tokens);
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
}