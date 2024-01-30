package com.ssafy.koala.controller.chat;

import com.ssafy.koala.dto.chat.ChatroomDto;
import com.ssafy.koala.dto.chat.ChatroomResponseDto;
import com.ssafy.koala.dto.chat.CreateRequestDto;
import com.ssafy.koala.dto.chat.LeaveRequestDto;
import com.ssafy.koala.service.chat.ChatService;
import com.ssafy.koala.service.chat.ChatroomService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chatroom")
@Tag(name="chatroom", description="chatroom controller")
public class ChatroomController {
    private final ChatroomService chatroomService;
    private final ChatService chatService;
    public ChatroomController (ChatroomService chatroomService, ChatService chatService) {
        this.chatroomService = chatroomService;
        this.chatService = chatService;
    }

    @PostMapping("/createRoom")
    public ResponseEntity<ChatroomDto> createRoom(@RequestBody CreateRequestDto requestDto) {
        ChatroomDto chatroom = chatroomService.createRoom(requestDto.getUserEmail1(), requestDto.getUserEmail2());

        return new ResponseEntity<>(chatroom,HttpStatus.OK);
    }

    @PostMapping("/roomlist")
    public ResponseEntity<List<ChatroomResponseDto>> getChatroomByUserId(@RequestBody String email) {
        List<ChatroomResponseDto> list = chatService.getChatroomByUserId(email);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/leave")
    public Object leaveChatroomByUserIdAndChatroomId(@RequestBody LeaveRequestDto requestDto) {
        chatService.removeUserFromChatroom(requestDto.getUserEmail(), requestDto.getChatroomId());
        return new ResponseEntity<>(null,HttpStatus.OK);
    }
}
