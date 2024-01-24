package com.ssafy.koala.service;

import com.ssafy.koala.model.CommentModel;
import com.ssafy.koala.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService (CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // 댓글 생성
    public CommentModel createComment(CommentModel comment) {
        return commentRepository.save(comment);
    }

    // 댓글 조회
    public CommentModel getCommentById(Long commentId) {
        Optional<CommentModel> commentOptional = commentRepository.findById(commentId);
        return commentOptional.orElse(null);
    }
    ;


    // 댓글 업데이트
    public CommentModel updateComment(Long commentId, CommentModel updatedComment) {
        Optional<CommentModel> existingCommentOptional = commentRepository.findById(commentId);

        if (existingCommentOptional.isPresent()) {
            CommentModel existingComment = existingCommentOptional.get();
            existingComment.setContent(updatedComment.getContent());
            existingComment.setDate(updatedComment.getDate());
            // 기타 필드 업데이트

            return commentRepository.save(existingComment);
        }
        return null;
    }
    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
