package com.ssafy.koala.service.chat;

import com.ssafy.koala.repository.chat.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


}
