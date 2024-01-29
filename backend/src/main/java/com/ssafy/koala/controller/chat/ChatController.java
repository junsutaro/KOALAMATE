package com.ssafy.koala.controller.chat;

import com.ssafy.koala.dto.chat.MessageDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

   // private final SimpMessagingTemplate messagingTemplate;

   // public ChatController(SimpMessagingTemplate messagingTemplate) {
   //     this.messagingTemplate = messagingTemplate;
   // }

    @MessageMapping("/message/{roomId}")
    @SendTo("/topic/messages/{roomId}")
    public String sendMessage(@PathVariable String roomId, String message) {
        System.out.println(roomId);
        // 메시지를 받아서 "/topic/messages"에 있는 모든 구독자에게 브로드캐스트합니다.
        return message;
    }
}
