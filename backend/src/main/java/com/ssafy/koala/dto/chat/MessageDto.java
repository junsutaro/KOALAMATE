package com.ssafy.koala.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class MessageDto {
    private String nickname;
    private String content;
    private int category;
    private LocalDateTime date;
}
