package com.ssafy.koala.handler;

import org.kurento.client.WebRtcEndpoint;
import org.springframework.web.socket.WebSocketSession;

public class VoiceChatHandler {

    private final WebSocketSession session;
    private final WebRtcEndpoint webRtcEndpoint;

    public VoiceChatHandler(WebSocketSession session, WebRtcEndpoint webRtcEndpoint) {
        this.session = session;
        this.webRtcEndpoint = webRtcEndpoint;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public WebRtcEndpoint getWebRtcEndpoint() {
        return webRtcEndpoint;
    }
}
