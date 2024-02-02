package com.ssafy.koala.repository;

import com.ssafy.koala.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel,Long> {
	Optional<UserModel> findUserByNicknameOrEmail(String nickname, String email);

	Optional<UserModel> findUserByEmailAndPassword(String email, String password);

	Optional<UserModel> findUserByRefreshToken(String refreshToken);

	Optional<UserModel> findByEmail(String email);

	Optional<UserModel> findByNickname(String nickname);
}
