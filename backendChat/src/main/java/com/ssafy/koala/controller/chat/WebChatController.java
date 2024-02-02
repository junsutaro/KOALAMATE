package com.ssafy.koala.controller.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;

@Controller
public class WebChatController {
    @Autowired
    private static SimpMessagingTemplate messagingTemplate;
    private final Socket socket;
    private final PrintWriter writer;
    public WebChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

	    try {
		    socket = new Socket("localhost", 7777);
	        writer = new PrintWriter(socket.getOutputStream(), true);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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

        writer.println(message);


//        ChatroomModel chatroom = chatroomService.getChatroomById(Long.parseLong(roomId));
//        MessageModel messageModel = new MessageModel();
//        BeanUtils.copyProperties(message,messageModel);
//        messageModel.setChatroom(chatroom);
//        messageService.saveMessage(messageModel);

        // 메시지를 받아서 "/topic/messages"에 있는 모든 구독자에게 브로드캐스트합니다.
        return message;
    }
}
