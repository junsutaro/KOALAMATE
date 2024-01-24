package com.ssafy.koala.controller;

import com.ssafy.koala.dto.BoardDto;
import com.ssafy.koala.dto.comment.CommentDto;
import com.ssafy.koala.model.CommentModel;
import com.ssafy.koala.service.BoardService;
import com.ssafy.koala.service.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@Tag(name="comment", description="comment controller")
public class CommentController {
    private final CommentService commentService;
    private final BoardService boardService;

    public CommentController(CommentService commentService, BoardService boardService) {
        this.commentService = commentService;
        this.boardService = boardService;
    }

    // 댓글 생성
    @PostMapping("{board_id}/write")
    public ResponseEntity<CommentModel> createComment(@PathVariable Long board_id, @RequestBody CommentDto commentDto) {
        CommentModel comment = new CommentModel();
        comment.setNickname(commentDto.getNickname());
        comment.setDate(commentDto.getDate());
        comment.setContent(commentDto.getContent());

        BoardDto board = boardService.getBoardById(board_id);

        comment.setBoard(boardService.convertToBoard(board));

        return new ResponseEntity<>(commentService.createComment(comment), HttpStatus.CREATED);
    }

    // 댓글 조회
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentModel> getCommentById(@PathVariable Long commentId) {
        CommentModel comment = commentService.getCommentById(commentId);
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 댓글 업데이트
    @PutMapping("/{commentId}/modify")
    public ResponseEntity<CommentModel> updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentModel updatedComment
    ) {
        CommentModel updated = commentService.updateComment(commentId, updatedComment);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}/delete")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
