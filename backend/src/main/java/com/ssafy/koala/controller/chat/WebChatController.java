package com.ssafy.koala.controller.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.koala.dto.chat.MessageDto;
import com.ssafy.koala.dto.chat.SocketMessageDto;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.chat.MessageModel;
import com.ssafy.koala.service.chat.ChatService;
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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WebChatController {
    private final Map<String, String> sessionUserMap = new HashMap<>();
    private final MessageService messageService;
    private final ChatroomService chatroomService;
    private final ChatService chatService;
    public WebChatController(MessageService messageService, ChatroomService chatroomService, ChatService chatService) {

        this.messageService = messageService;
        this.chatroomService = chatroomService;
        this.chatService = chatService;

        try {
            ServerSocket serverSocket = new ServerSocket(7777);
            System.out.println("Server is running...");

            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected.");
            ObjectMapper objectMapper = new ObjectMapper();

            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter writer = new PrintWriter(clientSocket.getOutputStream(), true);


            // Read from and write to the client
            StringBuilder requestData = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                requestData.append(line);
                SocketMessageDto clientMessage = objectMapper.readValue(requestData.toString(), SocketMessageDto.class);
                ;
                System.out.println("Received from client: " + clientMessage);


                if (clientMessage.getRoomId() == -1) {
                    sessionUserMap.put(clientMessage.getSessionId(), "init");
                } else if (clientMessage.getRoomId() == -2) {
                    chatService.updateLastId(sessionUserMap.get(clientMessage.getSessionId()));
                    sessionUserMap.remove(clientMessage.getSessionId());
                } else {
                    if (sessionUserMap.get(clientMessage.getSessionId()).equals("init")) {
                        sessionUserMap.replace(clientMessage.getSessionId(), clientMessage.getNickname());
                    }
                    ChatroomModel chatroom = chatroomService.getChatroomById(clientMessage.getRoomId());
                    MessageModel messageModel = new MessageModel();
                    BeanUtils.copyProperties(clientMessage, messageModel);
                    messageModel.setChatroom(chatroom);
                    messageModel.setDate(LocalDateTime.now());
                    messageService.saveMessage(messageModel);
                }
            }

            // Clean up
            reader.close();
            writer.close();
            clientSocket.close();
            serverSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
