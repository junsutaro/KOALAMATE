package com.ssafy.koala.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Arrays;
import java.util.Map;

public class CustomHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
            HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
            // 쿠키에서 토큰 추출
            Cookie[] cookies = httpServletRequest.getCookies();
            if (cookies != null) {
                Arrays.stream(cookies)
                        .filter(cookie -> "refresh_token".equals(cookie.getName()))
                        .findFirst()
                        .ifPresent(authCookie -> {
                            // 여기에서 토큰 값을 사용하거나 attributes에 추가할 수 있습니다.
                            String authToken = authCookie.getValue();
                            attributes.put("refresh_token", authToken);
                        });
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // 핸드셰이크 후 처리 로직 (필요한 경우)
    }
}
