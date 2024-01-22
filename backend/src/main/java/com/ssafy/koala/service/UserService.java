package com.ssafy.koala.service;

import com.ssafy.koala.dto.BoardDto;
import com.ssafy.koala.dto.UserDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	public Optional<UserDto> findUserByEmailAndPassword(String email, String password) {
		UserModel user = userRepository.findUserByEmailAndPassword(email,password).orElse(null);

		return (user != null) ? Optional.of(convertToDto(user)) : null;
	}

	private UserDto convertToDto(UserModel user) {
		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);
		return userDto;
	}
}
