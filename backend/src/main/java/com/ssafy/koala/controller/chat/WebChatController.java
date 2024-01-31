package com.ssafy.koala.controller.chat;

import com.ssafy.koala.dto.chat.MessageDto;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.chat.MessageModel;
import com.ssafy.koala.service.chat.ChatroomService;
import com.ssafy.koala.service.chat.MessageService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class WebChatController {
    @Autowired
    private static SimpMessagingTemplate messagingTemplate;

   // public ChatController(SimpMessagingTemplate messagingTemplate) {
   //     this.messagingTemplate = messagingTemplate;
   // }
    private final MessageService messageService;
    private final ChatroomService chatroomService;
    public WebChatController(MessageService messageService, ChatroomService chatroomService, SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
        this.chatroomService = chatroomService;
    }


    @MessageMapping("/notification/{email}")
    @SendTo("/topic/notification/{email}")
    public String sendNotification(@PathVariable String email, String message) {
        System.out.println(email + " " + message);
        return message;
    }

    @MessageMapping("/messages/{roomId}")
    @SendTo("/topic/messages/{roomId}")
    public String sendMessage(@DestinationVariable String roomId, String message) {
        System.out.println(roomId + " " + message);
//        ChatroomModel chatroom = chatroomService.getChatroomById(Long.parseLong(roomId));
//        MessageModel messageModel = new MessageModel();
//        BeanUtils.copyProperties(message,messageModel);
//        messageModel.setChatroom(chatroom);
//        messageService.saveMessage(messageModel);

        // 메시지를 받아서 "/topic/messages"에 있는 모든 구독자에게 브로드캐스트합니다.
        return message;
    }
}
