package com.ssafy.koala.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class CommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String nickname;
    private Date date;
    private String content;

    @ManyToOne
    @JoinColumn(name="board_id")
    private BoardModel board;
}
