package com.ssafy.koala.dto.chat;

import lombok.Data;

@Data
public class LeaveRequestDto {
    private String userEmail;
    private long chatroomId;
}
