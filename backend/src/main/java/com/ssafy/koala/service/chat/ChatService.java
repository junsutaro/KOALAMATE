package com.ssafy.koala.service.chat;

import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.chat.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public void addUserToChatroom(UserModel user, ChatroomModel chatroom) {
        ChatModel chat = new ChatModel();
        chat.setUser(user);
        chat.setChatroom(chatroom);
        chatRepository.save(chat);
    }

    public void removeUserFromChatroom(UserModel user, ChatroomModel chatroom) {
        chatRepository.deleteByUserAndChatroom(user, chatroom);
    }
}
