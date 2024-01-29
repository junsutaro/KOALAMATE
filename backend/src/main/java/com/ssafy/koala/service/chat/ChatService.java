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

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public void addUserToChatRoom(UserModel user, ChatroomModel chatRoom) {
        ChatModel chat = new ChatModel();
        chat.setUser(user);
        chat.setChatroom(chatRoom);
        chatRepository.save(chat);
    }

    public void removeUserFromChatRoom(UserModel user, ChatroomModel chatRoom) {
        chatRepository.deleteByUserAndChatRoom(user, chatRoom);
    }
}
