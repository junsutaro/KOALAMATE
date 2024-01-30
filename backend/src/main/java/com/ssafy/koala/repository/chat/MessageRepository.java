package com.ssafy.koala.repository.chat;

import com.ssafy.koala.model.chat.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageModel,Long> {
    List<MessageModel> findTop50ByChatroomIdOrderByChatroomIdDesc(long id);
}
