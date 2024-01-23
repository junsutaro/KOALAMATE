package com.ssafy.koala.controller;

import com.ssafy.koala.dto.UserDto;
import com.ssafy.koala.model.user.SignupRequest;
import com.ssafy.koala.repository.UserRepository;
import com.ssafy.koala.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/user")
public class UserController {

	private final UserService userService;
	public UserController (UserService userService) {
		this.userService = userService;
	}

	// 로그인 메서드도 만들어야함
	@PostMapping("/login")
	public Object login(@RequestBody UserDto user) {
		ResponseEntity response = null;

		Optional<UserDto> userOpt = userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword());

		System.out.println(user.getEmail() + " " + user.getPassword());

		if(userOpt.isPresent()) {
			response = new ResponseEntity<>(userOpt.get(), HttpStatus.OK);
		}
		else {
			response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

		return response;
	}

//	@PostMapping("/user/signup")
////	@ApiOperation(value = "가입하기") // swagger api 명세내용임
//	public Object signup(@Valid @RequestBody SignupRequest request) {
//		Optional<UserDto> userOpt = repo.findUserByNicknameAndEmail(request.getNickname(), request.getEmail());
//
//		ResponseEntity response = null;
//		if (!userOpt.isPresent()) {
//			final BasicResponse result = new BasicResponse();
//			result.status = true;
//			result.data = "success";
//
//			User newUser = new User();
//			newUser.setEmail(request.getEmail());
//			newUser.setNickname(request.getNickname());
//			newUser.setPassword(request.getPassword());
//			newUser.setBirthRange(request.getBirthRange());
//			newUser.setPhone(request.getPhone());
//
//			userDao.save(newUser);
//
//			response = new ResponseEntity<>(result, HttpStatus.OK);
//		} else {
//			response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//		}
//
//		return response;
//	}
}