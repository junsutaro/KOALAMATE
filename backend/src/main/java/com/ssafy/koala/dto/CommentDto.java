package com.ssafy.koala.dto;

import com.ssafy.koala.model.BoardModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CommentDto {

    private long id;

    private String nickname;
    private Date date;
    private String content;

}
