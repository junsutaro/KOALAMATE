package com.ssafy.koala.config;

import com.ssafy.koala.config.jwt.JwtUtil;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.MessageModel;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.chat.ChatService;
import com.ssafy.koala.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private final Map<Long, String> sessionUserMap = new HashMap<>();
    private final JwtUtil jwtUtil;
    private final ChatService chatService;
    private final MessageService messageService;
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String token = (String)headerAccessor.getSessionAttributes().get("refresh_token");
        long userId = jwtUtil.getUserId(token);
        String sessionId = headerAccessor.getSessionId();

        // 유저 ID와 세션 ID를 연결하여 맵에 저장
        if(sessionUserMap.get(userId) != null)
            sessionUserMap.replace(userId, sessionId);
        else sessionUserMap.put(userId,sessionId);

        System.out.println("웹 소켓 연결: User ID - " + userId + ", Session ID - " + sessionId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        String token = (String)headerAccessor.getSessionAttributes().get("refresh_token");
        long userId = jwtUtil.getUserId(token);
        if(sessionId.equals(sessionUserMap.get(userId))) {
            System.out.println(userId);
            System.out.println("웹 소켓 연결 종료: User ID - " + userId + ", Session ID - " + sessionId);
           // chatService.updateLastId(userId);
        }
    }
}