package com.ssafy.koala.controller;

//import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//		ResponseEntity response = null;
//
//		Optional<UserDto> userOpt = userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
//
//		System.out.println(user.getEmail() + " " + user.getPassword());
//
//		if(userOpt.isPresent()) {
//			response = new ResponseEntity<>(userOpt.get(), HttpStatus.OK);
//		}
//		else {
//			response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//		}
//
//		return response;

		String token = this.userService.auth(user);
		return ResponseEntity.status(HttpStatus.OK).body(token);
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
			newUser.setEmail(request.getEmail());
			newUser.setNickname(request.getNickname());
			newUser.setPassword(request.getPassword());
			newUser.setBirthRange(request.getBirthRange());
			newUser.setGender(request.getGender());

			userService.save(newUser);

			response = new ResponseEntity<>(newUser, HttpStatus.OK);
		} else {
			response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return response;
	}
}