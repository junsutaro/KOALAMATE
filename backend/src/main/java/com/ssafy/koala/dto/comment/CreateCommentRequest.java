package com.ssafy.koala.dto.comment;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private Long boardId;
    private CommentDto commentDto;
}
