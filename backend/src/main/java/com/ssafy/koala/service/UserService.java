package com.ssafy.koala.service;

//import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.BoardDto;
//import com.ssafy.koala.dto.SecurityUserDto;
import com.ssafy.koala.dto.UserDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;
//	private final JwtUtil jwtUtil;
//	private final PasswordEncoder encoder;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
//	public UserService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder encoder) {
//		this.userRepository = userRepository;
//		this.jwtUtil = jwtUtil;
//		this.encoder = encoder;
//	}
	public Optional<UserDto> findUserByEmailAndPassword(String email, String password) {
		UserModel user = userRepository.findUserByEmailAndPassword(email,password).orElse(null);

		return (user != null) ? Optional.of(convertToDto(user)) : null;
	}

	public Optional<UserDto> findUserByNicknameAndEmail(String email, String nickname) {
		UserModel user = userRepository.findUserByNicknameAndEmail(email,nickname).orElse(null);

		return (user != null) ? Optional.of(convertToDto(user)) : null;
	}

//	public String auth(UserDto dto) {
//		String email = dto.getEmail();
//		String password = dto.getPassword();
//		UserModel user = userRepository.getUserByEmail(email);
//		if(user == null) {
//			throw new UsernameNotFoundException("이메일이 존재하지 않습니다.");
//		}
//
//		if(!encoder.matches(password, user.getPassword())) {
//			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
//		}
//
//	}

	public void save(UserDto newUser) {
		UserModel user = convertToModel(newUser);
		userRepository.save(user);
	}

	private UserDto convertToDto(UserModel user) {
		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);
		return userDto;
	}

	private UserModel convertToModel(UserDto user) {
		UserModel userModel = new UserModel();
		BeanUtils.copyProperties(user, userModel);
		return userModel;
	}
}
