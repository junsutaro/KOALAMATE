package com.ssafy.koala.controller;

import com.ssafy.koala.model.CommentModel;
import com.ssafy.koala.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 댓글 생성
    @PostMapping("/write")
    public ResponseEntity<CommentModel> createComment(@RequestBody CommentModel comment) {
        CommentModel createdComment = commentService.createComment(comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
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

    // 특정 게시물에 속한 모든 댓글 조회
    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<CommentModel>> getCommentsByBoardId(@PathVariable Long boardId) {
        List<CommentModel> comments = commentService.getCommentsByBoardId(boardId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 댓글 업데이트
    @PutMapping("/{commentId}")
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
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
