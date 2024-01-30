package com.ssafy.koala.controller;

//import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.FollowResponseDto;
import com.ssafy.koala.dto.user.TokenResponse;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.dto.user.UserListDto;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.FollowRepository;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.user.FollowService;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
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
		ResponseEntity response = null;

		Optional<UserDto> userOpt = Optional.empty();

		userOpt = userService.findUserByNicknameOrEmail(request.getNickname(), request.getEmail());
		System.out.println(request.getEmail() + " " + request.getNickname());

		if (userOpt.isEmpty()) {
			UserDto newUser = new UserDto();
			BeanUtils.copyProperties(request, newUser);

			userService.save(newUser);
			userService.createUserWithRefrigerator(newUser);

			response = new ResponseEntity<>(newUser, HttpStatus.CREATED);
		} else {
			response = new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return response;
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
	@GetMapping("{user_id}/followee")
	public ResponseEntity<?> getFolloweeList(@PathVariable long user_id) {
		List<UserListDto> followeeList = followService.findFolloweeById(user_id);
		long cnt = followService.countByFollowee_Id(user_id);
		// DTO에 팔로우 수랑 유저가 팔로우 하는 리스트 담아서 리턴
		FollowResponseDto dto = new FollowResponseDto();
		dto.setFollowCnt(cnt);
		dto.setList(followeeList);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	// 유저 팔로워 목록
	@GetMapping("{user_id}/follower")
	public ResponseEntity<?> getFollowerList(@PathVariable long user_id) {
		List<UserListDto> followerList = followService.findFollowerById(user_id);
		long cnt = followService.countByFollower_Id(user_id);
		// DTO에 팔로워 수랑 유저를 팔로우 하는 리스트 담아서 리턴
		FollowResponseDto dto = new FollowResponseDto();
		dto.setFollowCnt(cnt);
		dto.setList(followerList);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	// 팔로우 요청
	@PostMapping("/follow")
	public ResponseEntity<?> followRequest(@RequestBody long user_id) {
		// 자신의 정보는 JWT에서 가져오기
		UserDto currentUser = authService.getCurrentUser();
		log.info(currentUser.getId()+"\n");
		long myUid = currentUser.getId();
		followService.followUser(myUid, user_id);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 언팔로우 요청
	@PostMapping("/unfollow")
	public ResponseEntity<?> unfollowRequest(@RequestBody long user_id) {
		// 자신의 정보는 JWT에서 가져오기
		UserDto currentUser = authService.getCurrentUser();
		long myUid = currentUser.getId();
		followService.unfollowUser(myUid, user_id);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

>>>>>>> issue-back-follow
}