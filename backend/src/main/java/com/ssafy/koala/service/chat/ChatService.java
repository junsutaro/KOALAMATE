package com.ssafy.koala.service.chat;

import com.ssafy.koala.dto.chat.ChatroomDto;
import com.ssafy.koala.dto.chat.ChatroomResponseDto;
import com.ssafy.koala.dto.chat.MessageDto;
import com.ssafy.koala.model.chat.ChatModel;
import com.ssafy.koala.model.chat.ChatroomModel;
import com.ssafy.koala.model.chat.MessageModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.chat.ChatRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Transactional
    public void removeUserFromChatroom(String userEmail, long chatroomId) {
        chatRepository.deleteByUserEmailAndChatroomId(userEmail, chatroomId);
    }

    public List<ChatroomResponseDto> getChatroomByUserId(long id) {
        List<ChatModel> results = chatRepository.findByUserId(id);
        return results.stream()
                .map(temp -> {
                    ChatroomResponseDto insert = new ChatroomResponseDto();
                    insert.setTheme(temp.getTheme());
                    insert.setId(temp.getChatroom().getId());
                    insert.setActive(temp.getChatroom().isActive());
                    insert.setRoomName(temp.getChatroom().getRoomName());

                    int lastIdx = temp.getChatroom().getMessages().size() - 1;
                    if(lastIdx >= 0) {
                        MessageDto message = new MessageDto();
                        BeanUtils.copyProperties(temp.getChatroom().getMessages().get(lastIdx), message);
                    }
                    return insert;
                })
                .collect(Collectors.toList());
    }
<<<<<<< Updated upstream
=======

    public List<ChatModel> findByUserId(long id) {
        return chatRepository.findByUserId(id);
    }

    public void updateLastId(long id) {
        chatRepository.updateLastIdForChatByUserId(id);
        // ChatRepository를 사용하여 Chat 엔티티를 업데이트합니다.

    }
>>>>>>> Stashed changes
}
