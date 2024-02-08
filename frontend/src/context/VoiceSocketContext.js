import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import {OpenVidu} from 'openvidu-browser';
import Avatar from '@mui/material/Avatar';
import UserVoiceComponent from '../components/UserVoiceComponent';


const VoiceSocketContext = createContext();

export const VoiceSocketProvider = ({children}) => {
    const [session, setSession] = useState(null);
    const [OV, setOV] = useState(new OpenVidu());
    const [participants, setParticipants] = useState([]);

    const [publisher, setPublisher] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true); // 카메라 상태 관리
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true); // 마이크 상태 관리

    const [users, setUsers] = useState(null);
    const [curUser, setCurUser] = useState(null);

    const [streams, setStreams] = useState({}); // 스트림 목록 상태

    const connectToSession = useCallback(async (token) => {
        if (session) session.disconnect(); // 기존 세션 연결 해제

        const newSession = OV.initSession();
        newSession.on('streamCreated', event => {
            // const nickname = event.stream.connection.data.split("=")[1];
            // const existingDiv = document.getElementById(`subscriber-${nickname}`);
            // if (existingDiv) {
            //     existingDiv.parentNode.removeChild(existingDiv); // 기존 div 제거
            // }
            //
            // const subscriber = newSession.subscribe(event.stream, subscriberDivId);
            // setParticipants(prevParticipants => [...prevParticipants, {subscriber, nickname, subscriberDivId}]);
            // console.log(participants);
            setStreams(prevStreams => ({ ...prevStreams, [event.stream.connection.connectionId]: event.stream }));
        });
        newSession.on('streamDestroyed', event => {
            // const nickname = event.stream.connection.data.split("=")[1];
            // setParticipants(prev => prev.filter(participant => participant.nickname !== nickname));
            setStreams(prevStreams => {
                const newStreams = { ...prevStreams };
                delete newStreams[event.stream.connection.connectionId];
                return newStreams;
            });
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

    // useEffect(() => {
    //     if (users && curUser) {
    //         const userListDiv = document.getElementById('userList');
    //         userListDiv.innerHTML = ''; // 기존 내용을 초기화
    //         userListDiv.style.display = 'flex';
    //         userListDiv.style.flexWrap = 'wrap';
    //         userListDiv.style.justifyContent = 'center';
    //
    //         users.forEach(user => {
    //             let userDiv = document.createElement('div');
    //             userDiv.id = `subscriber-${user.nickname}`;
    //             userDiv.style.margin = '10px';
    //             userDiv.style.display = 'flex';
    //             userDiv.style.flexDirection = 'column';
    //             userDiv.style.alignItems = 'center';
    //             userDiv.style.border = `2px solid ${user.nickname === curUser.nickname ? 'blue' : 'grey'}`;
    //             userDiv.style.borderRadius = '10px';
    //             userDiv.style.padding = '10px';
    //
    //             // Avatar로 변경
    //             let profileImg;
    //             if (user.nickname === curUser.nickname) {
    //                 profileImg = document.getElementById('publisher-container');
    //                 if (!profileImg) {
    //                     profileImg = document.createElement('div');
    //                     profileImg.id = 'publisher-container';
    //                 }
    //                 userDiv.appendChild(profileImg);
    //             } else {
    //                 profileImg = new Avatar({ src: user?.profile || 'default_profile_picture_url', sx: { width: 100, height: 100 } });
    //                 profileImg.onerror = () => profileImg.src = 'alternative_path_if_error'; // 이미지 로드 실패 시 대체 이미지
    //                 userDiv.appendChild(profileImg);
    //             }
    //
    //             const nicknameText = document.createElement('div');
    //             nicknameText.innerText = user.nickname;
    //             nicknameText.style.marginTop = '5px';
    //
    //             userDiv.appendChild(nicknameText);
    //             userListDiv.appendChild(userDiv);
    //         });
    //     }
    // }, [users, curUser, participants]);


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

            <div>
                {users?.map(user => (
                    <UserVoiceComponent
                        key={user.nickname}
                        user={user}
                        isCurrent={curUser.nickname === user.nickname}
                        stream={streams[user.connectionId]} // 스트림이 있으면 전달
                    />
                ))}
            </div>
            <button onClick={toggleCamera}>{isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}</button>
            <button onClick={toggleMicrophone}>{isMicrophoneEnabled ? '마이크 끄기' : '마이크 켜기'}</button>

        </VoiceSocketContext.Provider>
    );
};

export const useVoiceSocket = () => useContext(VoiceSocketContext);
