package com.ssafy.koala.repository;

import com.ssafy.koala.dto.UserDto;
import com.ssafy.koala.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel,Long> {
	//UserDto getUserByEmail(String email);

//	Optional<UserDto> findUserByNicknameAndEmail(String nickname, String email);

	Optional<UserModel> findUserByEmailAndPassword(String email, String password);
}
