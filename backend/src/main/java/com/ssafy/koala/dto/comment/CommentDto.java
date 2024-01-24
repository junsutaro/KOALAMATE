package com.ssafy.koala.dto.comment;

import com.ssafy.koala.model.BoardModel;
import lombok.Data;

import java.util.Date;

@Data
public class CommentDto {

    private Long commentId;

    private String nickname;
    private Date date;
    private String content;

    private BoardModel board;
}
