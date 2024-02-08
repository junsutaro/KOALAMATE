import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import { OpenVidu } from 'openvidu-browser';

const VoiceSocketContext = createContext();

export const VoiceSocketProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [OV, setOV] = useState(new OpenVidu());
    const [participants, setParticipants] = useState([]);

    const [publisher, setPublisher] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true); // 카메라 상태 관리
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true); // 마이크 상태 관리

    const [users,setUsers] = useState(null);
    const [curUser,setCurUser] = useState(null);

    const connectToSession = useCallback(async (token) => {
        if (session) session.disconnect(); // 기존 세션 연결 해제

        const newSession = OV.initSession();
        newSession.on('streamCreated', event => {
            const nickname = event.stream.connection.data.split("=")[1];
            const subscriberDivId = `subscriber-${nickname}`; // 각 구독자별 고유 ID 생성
            const subscriberDiv = document.createElement('div');
            subscriberDiv.id = subscriberDivId;
            document.getElementById('userList').appendChild(subscriberDiv); // 이 부분은 조정이 필요할 수 있습니다.

            const subscriber = newSession.subscribe(event.stream, subscriberDivId);
            setParticipants(prevParticipants => [...prevParticipants, { subscriber, nickname, subscriberDivId }]);
            console.log(participants);
        });
        newSession.on('streamDestroyed', event => {
            const nickname = event.stream.connection.data.split("=")[1];
            setParticipants(prev => prev.filter(participant => participant.nickname !== nickname));
        });
        await newSession.connect(token);

        const newPublisher = OV.initPublisher('publisher-container', {
            videoSource: true, // 카메라 사용
            audioSource: true, // 마이크 사용
        });
        await newSession.publish(newPublisher);

        setPublisher(newPublisher);
        setSession(newSession);

        setSession(newSession);
    }, [OV, session]);

    const disconnectSession = useCallback(() => {
        if (session) {
            console.log(session);
            session.disconnect();
            setSession(null);
            setParticipants([]);
        }
    }, [session]);

    useEffect(() => {
        if(users) {
            console.log(users);
            const userListDiv = document.getElementById('userList');
            userListDiv.innerHTML = ''; // 기존 내용을 초기화
            if(session) {
                users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.innerText = user.nickname; // 닉네임 표시
                    userDiv.style.border = '2px solid grey'; // 스타일 설정
                    userDiv.style.margin = '10px';
                    userDiv.style.padding = '10px';

                    userListDiv.appendChild(userDiv);

                    if (user.nickname === curUser.nickname) {
                        // 현재 사용자인 경우 publisher-container를 이동
                        userDiv.appendChild(document.getElementById('publisher-container'));
                        userDiv.style.border = '2px solid blue'; // 현재 사용자 표시
                    } else {
                        // 나머지 사용자들은 subscriberDiv를 해당 위치로 이동
                        const participant = participants.find(p => p.nickname === user.nickname);
                        if (participant) {
                            const subscriberDiv = document.getElementById(participant.subscriberDivId);
                            if (subscriberDiv) {
                                userDiv.appendChild(subscriberDiv);
                            }
                        }
                    }
                });
            }
        }
    }, [participants, users]); // participants 또는 users가 변경될 때마다 실행

    const toggleCamera = useCallback(() => {
        if (publisher) {
            const newIsCameraEnabled = !isCameraEnabled;
            publisher.publishVideo(newIsCameraEnabled);
            setIsCameraEnabled(newIsCameraEnabled);
        }
    }, [publisher, isCameraEnabled]);

    const toggleMicrophone = useCallback(() => {
        if (publisher) {
            const newIsMicrophoneEnabled = !isMicrophoneEnabled;
            publisher.publishAudio(newIsMicrophoneEnabled);
            setIsMicrophoneEnabled(newIsMicrophoneEnabled);
        }
    }, [publisher, isMicrophoneEnabled]);

    return (
        <VoiceSocketContext.Provider value={{
            session,
            participants,
            connectToSession,
            disconnectSession,
            setParticipants,
            toggleCamera,
            toggleMicrophone,
            setUsers,
            setCurUser
        }}>
            {children}

            <div id='userList'>
                <div id='subscriberDiv'></div>
            </div>
            <div id='publisher-container'></div>
            <button onClick={toggleCamera}>{isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}</button>
            <button onClick={toggleMicrophone}>{isMicrophoneEnabled ? '마이크 끄기' : '마이크 켜기'}</button>

        </VoiceSocketContext.Provider>
    );
};

export const useVoiceSocket = () => useContext(VoiceSocketContext);
