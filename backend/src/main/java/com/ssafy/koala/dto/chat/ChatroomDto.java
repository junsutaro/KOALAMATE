package com.ssafy.koala.dto.chat;

import com.ssafy.koala.model.chat.MessageModel;

import java.util.List;

public class ChatroomDto {
    private long id;
    private int theme;
    private String roomName;
    private boolean isActive;
    private List<MessageDto> messages;
}
