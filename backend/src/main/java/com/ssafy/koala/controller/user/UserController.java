package com.ssafy.koala.controller.user;

import com.ssafy.koala.dto.user.*;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.user.FollowService;
import com.ssafy.koala.service.user.ProfileService;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name="user", description="user controller")
@Slf4j
public class UserController {
	private final UserService userService;
	private final FollowService followService;
	private final AuthService authService;

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
		try {
			UserDto newUser = new UserDto();
			BeanUtils.copyProperties(request, newUser);

//			userService.save(newUser);
			userService.createUserWithRefrigerator(newUser);
			return new ResponseEntity<>(newUser, HttpStatus.CREATED);
		} catch(Exception e) {
			return new ResponseEntity<>("회원가입 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/check-email")
	public ResponseEntity<?> checkEmailDuplicate(@RequestBody UserDto user) {
		try {
			String email = user.getEmail();
			Optional<UserDto> userOpt = userService.findByEmail(email);
			if (userOpt.isEmpty()) {
				return new ResponseEntity<>(Map.of("available", true), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(Map.of("available", false), HttpStatus.OK);
			}
		} catch(Exception e) {
			return new ResponseEntity<>("중복확인에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/check-nickname")
	public  ResponseEntity<?> checkNicknameDuplicate(@RequestBody UserDto user) {
		try {
			String nickname = user.getNickname();
			Optional<UserDto> userOpt = userService.findByNickname(nickname);
			if (userOpt.isEmpty()) {
				return new ResponseEntity<>(Map.of("available", true), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(Map.of("available", false), HttpStatus.OK);
			}
		} catch(Exception e) {
			return new ResponseEntity<>("중복확인에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// httponly 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletResponse response) {
		Cookie cookie = new Cookie("refresh_token", null);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(0); // 쿠키를 즉시 만료시킵니다.
		response.addCookie(cookie);
		return ResponseEntity.ok().build();
	}

	// 유저 팔로우 목록
	@GetMapping("/{user_id}/followee")
	public ResponseEntity<?> getFolloweeList(@PathVariable long user_id) {
		List<UserListDto> followeeList = followService.findFolloweeById(user_id);
		long cnt = followService.countByFollowee_Id(user_id);
		// DTO에 팔로우 수랑 유저가 팔로우 하는 리스트 담아서 리턴
		FollowResponseDto dto = new FollowResponseDto();
		dto.setFollowCnt(cnt);
		dto.setList(followeeList);

		// 해당 id의 userId, nickname Optional로(필요없긴함) 같이 넘겨요
		Optional<UserModel> userOpt = userService.findById(user_id); // userService에 findById 메소드가 있다고 가정
		if (userOpt.isPresent()) {
			UserModel user = userOpt.get();
			dto.setId(user.getId());
			dto.setNickname(user.getNickname());
		}

		return new ResponseEntity<>(dto, HttpStatus.OK);

	}

	// 유저 팔로워 목록
	@GetMapping("/{user_id}/follower")
	public ResponseEntity<?> getFollowerList(@PathVariable long user_id) {
		List<UserListDto> followerList = followService.findFollowerById(user_id);
		long cnt = followService.countByFollower_Id(user_id);
		// DTO에 팔로워 수랑 유저를 팔로우 하는 리스트 담아서 리턴
		FollowResponseDto dto = new FollowResponseDto();
		dto.setFollowCnt(cnt);
		dto.setList(followerList);

		// 해당 id의 userId, nickname Optional로(필요없긴함) 같이 넘겨요
		Optional<UserModel> userOpt = userService.findById(user_id); // userService에 findById 메소드가 있다고 가정
		if (userOpt.isPresent()) {
			UserModel user = userOpt.get();
			dto.setId(user.getId());
			dto.setNickname(user.getNickname());
		}
		return new ResponseEntity<>(dto, HttpStatus.OK);

	}

	// 팔로우 여부에 따라 팔로우 or 언팔로우
	@PostMapping("/follow")
	public ResponseEntity<?> followToggle(@RequestBody long userId, HttpServletRequest request) {
		// 자신의 정보는 JWT에서 가져오기
		String accessToken = authService.getAccessToken(request);
		UserDto user = authService.extractUserFromToken(accessToken);
		log.info(user.getId()+"\n");
		long myUid = user.getId();

		try {
			boolean isFollowed = followService.checkFollow(myUid, userId);
			if(isFollowed) {
				// 언팔로우
				followService.unfollowUser(myUid, userId);
			} else {
				// 팔로우
				followService.followUser(myUid, userId);
			}
			return new ResponseEntity<>("Follow for ID " + userId + " processed successfully.", HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			// 해당 ID에 해당하는 엔티티가 존재하지 않는 경우
			return new ResponseEntity<>("Follow with ID " + userId + " not found.", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// 기타 예외 처리
			return new ResponseEntity<>("Error follow request with ID " + userId, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/myId")
	public ResponseEntity<?> getMyId(HttpServletRequest request) {
		String accessToken = authService.getAccessToken(request);
		UserDto user = authService.extractUserFromToken(accessToken);
		return new ResponseEntity<>(user.getId(), HttpStatus.OK);
	}
}