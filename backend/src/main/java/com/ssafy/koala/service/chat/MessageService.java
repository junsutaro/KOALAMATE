package com.ssafy.koala.service.chat;


import com.ssafy.koala.dto.chat.MessageDto;
import com.ssafy.koala.model.chat.MessageModel;
import com.ssafy.koala.repository.chat.MessageRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<MessageDto> getMessagesByRoomId(long id) {
        return messageRepository.findTop50ByChatroomIdOrderByChatroomIdDesc(id)
                .stream()
                .map(temp -> {
                    MessageDto insert = new MessageDto();
                    BeanUtils.copyProperties(temp, insert);
                    return insert;
                })
                .collect(Collectors.toList());
    }

    public void saveMessage(MessageModel messageModel) {
        messageRepository.save(messageModel);
    }
}
