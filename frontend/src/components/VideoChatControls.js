import React, { useState } from 'react';

const VideoChatControls = ({ publisher }) => {
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    const toggleAudio = () => {
        if (publisher) {
            const newAudioEnabled = !audioEnabled;
            publisher.publishAudio(newAudioEnabled);
            setAudioEnabled(newAudioEnabled);
        }
    };

    const toggleVideo = () => {
        if (publisher) {
            const newVideoEnabled = !videoEnabled;
            publisher.publishVideo(newVideoEnabled);
            setVideoEnabled(newVideoEnabled);
        }
    };

    return (
        <div>
            <button onClick={toggleAudio}>{audioEnabled ? 'Mute' : 'Unmute'}</button>
            <button onClick={toggleVideo}>{videoEnabled ? 'Hide Video' : 'Show Video'}</button>
        </div>
    );
};

export default VideoChatControls;
