import React, { useEffect, useState } from 'react';
import Chatting from 'components/Chatting';
import {
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import { useVoiceSocket } from 'context/VoiceSocketContext';

const getChatRooms = () => {
	const chatRooms = sessionStorage.getItem('roomList');
	return chatRooms ? JSON.parse(chatRooms) : [];
};

const Chattings = () => {
	const [rooms, setRooms] = useState([]);
	const [activeCall, setActiveCall] = useState(null);
	const [expandedRoomId, setExpandedRoomId] = useState(null);
	const navigate = useNavigate();
	const { disconnectSession } = useVoiceSocket();
	const location = useLocation(); // 현재 위치 정보를 가져옵니다.

	useEffect(() => {
		const chatRooms = getChatRooms();
		setRooms(chatRooms);
		// sessionStorage에서 activeCall 상태 복원
		const storedActiveCall = sessionStorage.getItem('activeCall');
		if (storedActiveCall) {
			setActiveCall(JSON.parse(storedActiveCall));
		}
	}, []);

	useEffect(() => {
		// activeCall 상태 변경 시 sessionStorage에 저장
		sessionStorage.setItem('activeCall', JSON.stringify(activeCall));
	}, [activeCall]);

	const toggleExpand = (roomId, room) => {
		room.confirmMessageId = room.lastMessage.id;
		setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
	};

	const voiceCall = (roomId, users) => {
		setActiveCall(roomId);
		disconnectSession();
		navigate(`/voiceChat/${roomId}`, { state: { users } });
	};

	const disconnectCall = () => {
		setActiveCall(null);
		disconnectSession();

		if (/^\/voiceChat\/\d+$/.test(location.pathname)) {
			navigate('/'); // 조건이 충족되면 홈 화면으로 이동합니다.
		}
	};

	return (
		<List component="nav">
			{rooms.map((room) => (
				<React.Fragment key={room.id}>
					<ListItem button onClick={() => toggleExpand(room.id, room)}>
						<ListItemText
							primary={room.users.map(user => user.nickname).join(', ')}
							secondary={expandedRoomId !== room.id ? room.lastMessage && `${room.lastMessage.nickname}: ${room.lastMessage.content}` : ''}
						/>
						{expandedRoomId === room.id ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<IconButton color="primary" onClick={() => voiceCall(room.id, room.users)}
									disabled={activeCall === room.id}>
							<PhoneIcon/>
						</IconButton>
						<IconButton color="secondary" onClick={() => disconnectCall()}
									disabled={activeCall !== room.id}>
							<CallEndIcon/>
						</IconButton>
						{/* Badge를 오른쪽으로 정렬하기 위한 컨테이너 */}
						<div style={{marginLeft: 'auto', marginRight:'20px'}}>
							<Badge color="secondary" variant="dot"
								   invisible={room.lastMessage.id === room.confirmMessageId}>
								<MailIcon
									color={room.lastMessage.id === room.confirmMessageId ? "disabled" : "action"}/>
							</Badge>
						</div>
					</div>
					{expandedRoomId === room.id && <Chatting roomNumber={room.id} users={room.users}/>}
					<Divider/>
				</React.Fragment>
			))}
		</List>
	);
};

export default Chattings;
