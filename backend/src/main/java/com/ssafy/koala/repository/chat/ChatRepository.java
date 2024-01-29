package com.ssafy.koala.repository.chat;

import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatModel, Long> {
    void deleteByUserAndChatroom(UserModel user, ChatroomModel chatroom);
}
