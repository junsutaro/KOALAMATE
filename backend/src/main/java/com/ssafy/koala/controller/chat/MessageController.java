package com.ssafy.koala.controller.chat;

import com.ssafy.koala.dto.chat.MessageDto;
import com.ssafy.koala.service.chat.MessageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/message")
@Tag(name="message", description="message controller")
public class MessageController {
    private final MessageService messageService;
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/enter")
    public ResponseEntity<List<MessageDto>> getMeesagesByRoomId(@RequestBody long roomId) {
        List<MessageDto> list = messageService.getMessagesByRoomId(roomId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
