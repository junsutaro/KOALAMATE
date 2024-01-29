package com.ssafy.koala.model.chat;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class MessageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nickname;
    private String content;
    private Date date;
    private int category;

    @ManyToOne
    @JoinColumn(name="chatroom_id")
    private ChatroomModel chatroom;
}
