package com.ssafy.koala.service.chat;

import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.chat.ChatroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatroomService {
    private final ChatroomRepository chatroomRepository;

    public ChatroomService(ChatroomRepository chatroomRepository) {
        this.chatroomRepository = chatroomRepository;
    }


}
