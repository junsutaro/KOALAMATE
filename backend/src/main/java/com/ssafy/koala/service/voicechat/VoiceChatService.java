package com.ssafy.koala.service.voicechat;

import com.ssafy.koala.handler.VoiceChatHandler;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class VoiceChatService {

    private final KurentoClient kurentoClient;
    private final Map<String, MediaPipeline> roomMediaPipelineMap = new ConcurrentHashMap<>();

    @Autowired
    public VoiceChatService(KurentoClient kurentoClient) {
        this.kurentoClient = kurentoClient;
    }

    public void joinVoiceChat(String roomId, WebSocketSession session) {
        // Create or get existing MediaPipeline for the room
        MediaPipeline mediaPipeline = roomMediaPipelineMap.computeIfAbsent(roomId, key -> kurentoClient.createMediaPipeline());

        // Create a WebRTC endpoint
        WebRtcEndpoint webRtcEndpoint = new WebRtcEndpoint.Builder(mediaPipeline).build();

        // Set up communication between WebSocket and Kurento
        VoiceChatHandler handler = new VoiceChatHandler(session, webRtcEndpoint);
        session.getAttributes().put("handler", handler);

        // Add the WebRTC endpoint to the room
        // You may want to handle multiple users joining the room and connect their endpoints
        // This is a simplified example for demonstration purposes
        webRtcEndpoint.connect(webRtcEndpoint);
    }

    public void leaveVoiceChat(String roomId, WebSocketSession session) {
        // Remove the user from the room and release resources if needed
        // This is a simplified example
        roomMediaPipelineMap.computeIfPresent(roomId, (key, pipeline) -> {
            pipeline.release();
            return null;
        });
    }
}