package com.ssafy.koala.controller.chat;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chatroom")
@Tag(name="chatroom", description="chatroom controller")
public class ChatroomController {
}
