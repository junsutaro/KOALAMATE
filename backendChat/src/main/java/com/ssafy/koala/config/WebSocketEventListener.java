package com.ssafy.koala.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.koala.controller.chat.WebChatController;
import com.ssafy.koala.dto.SocketMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

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
    private final ObjectMapper objectMapper = new ObjectMapper();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) throws JsonProcessingException {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = headerAccessor.getSessionId();
        System.out.println(headerAccessor);
        System.out.println("웹 소켓 연결: User ID - "  + ", Session ID - " + sessionId);

        SocketMessageDto sockMessageDto = new SocketMessageDto();
        sockMessageDto.setSessionId(sessionId);
        sockMessageDto.setContent("");
        sockMessageDto.setRoomId(-1);
        sockMessageDto.setNickname("");

        String jsonString = objectMapper.writeValueAsString(sockMessageDto);
        WebChatController.writer.println(jsonString);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) throws JsonProcessingException {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        System.out.println("웹 소켓 연결 종료: User ID - "  + ", Session ID - " + sessionId);

        SocketMessageDto sockMessageDto = new SocketMessageDto();
        sockMessageDto.setSessionId(sessionId);
        sockMessageDto.setContent("");
        sockMessageDto.setRoomId(-2);
        sockMessageDto.setNickname("");

        String jsonString = objectMapper.writeValueAsString(sockMessageDto);
        WebChatController.writer.println(jsonString);
    }
}