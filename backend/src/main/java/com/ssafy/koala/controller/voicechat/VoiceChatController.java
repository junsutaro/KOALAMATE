package com.ssafy.koala.controller.voicechat;

// VoiceChatController.java

import com.ssafy.koala.service.voicechat.VoiceChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

@RestController
public class VoiceChatController {

    private final VoiceChatService voiceChatService;

    @Autowired
    public VoiceChatController(VoiceChatService voiceChatService) {
        this.voiceChatService = voiceChatService;
    }

    @MessageMapping("/voice-chat/{roomId}")
    public void handleVoiceChat(@DestinationVariable String roomId, WebSocketSession session) {
        voiceChatService.joinVoiceChat(roomId, session);
    }

    @MessageMapping("/leave-voice-chat/{roomId}")
    public void leaveVoiceChat(@DestinationVariable String roomId, WebSocketSession session) {
        voiceChatService.leaveVoiceChat(roomId, session);
    }
}

