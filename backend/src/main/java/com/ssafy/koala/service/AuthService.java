package com.ssafy.koala.service;

import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.CustomUserDetails;
import com.ssafy.koala.dto.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    // UserDto를 JWT에서 추출해서 반환
    public UserDto getCurrentUser() {
        // 현재 요청에 대한 Authentication 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 사용자 정보 가져오기
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            // 여기에서 userDetails를 이용하여 필요한 유저 정보를 가져올 수 있음
            return userDetails.getUser();
        }
        // 사용자 정보가 UserDetails 타입이 아닌 경우에 대한 처리
        // 토큰이 만료되었더라도 UserDetails 타입이 아니면, 사용자 인증이 실패했다고 간주
        // => refresh token 검증 안하고 재로그인 요구
        throw new BadCredentialsException("사용자 인증에 실패하였습니다. 다시 로그인 해주세요.");
    }
}
