package com.ssafy.koala.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class MessageDto {
    private long id;
    private String nickname;

    private String content;
    private int category;
    private LocalDateTime date = LocalDateTime.now();

}
