package com.ssafy.koala.repository.chat;

import com.ssafy.koala.model.chat.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageModel,Long> {
}
