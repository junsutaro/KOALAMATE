package com.ssafy.koala.dto.chat;

import lombok.Data;

import java.util.List;

@Data
public class ChatroomResponseDto {
    private long id;
    private int theme;
    private String roomName;
    private boolean isActive;
    private MessageDto lastMessage;
}
