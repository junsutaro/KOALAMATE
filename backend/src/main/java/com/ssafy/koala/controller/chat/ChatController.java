package com.ssafy.koala.controller.chat;

import com.ssafy.koala.dto.chat.MessageDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{chatRoomId}")
    public void processMessage(@DestinationVariable long chatRoomId, MessageDto message) {
        // 메시지 처리 로직...

        // 특정 채팅방으로 메시지 전송
        messagingTemplate.convertAndSend("/topic/chat/" + chatRoomId, message);
    }

}
