package com.ssafy.koala.repository.chat;

import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatModel, Long> {
    void deleteByUserEmailAndChatroomId(String userEmail, long chatroomId);
    List<ChatModel> findByUserEmail(String email);
}
