import React, {useState} from 'react';
import Chatting from 'components/Chatting';
import {
	List,
	ListItem,
	ListItemText,
	Collapse,
	Box,
	Typography,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Chattings = () => {
	const chatRooms = [
		{id: 1, participants: ['Alice', 'Bob'], expanded: false},
		{id: 2, participants: ['Charlie', 'Dave'], expanded: false},
		{id: 3, participants: ['Eve', 'Frank'], expanded: false},
		{id: 4, participants: ['Grace', 'Hank'], expanded: false},
		// 추가 채팅방 데이터...
	];

	const [rooms, setRooms] = useState(chatRooms);

	const toggleExpand = (roomId) => {
		const updatedRooms = rooms.map(room =>
				room.id === roomId ? {...room, expanded: !room.expanded} : room,
		);
		setRooms(updatedRooms);
	};

	return (
			<List component="nav">
				{rooms.map((room) => (
						<React.Fragment key={room.id}>
							<ListItem button onClick={() => toggleExpand(room.id)}>
								<ListItemText primary={`${room.participants.join(', ')}`}/>
								{room.expanded ? <ExpandLess/> : <ExpandMore/>}
							</ListItem>
							<Collapse in={room.expanded} timeout="auto" unmountOnExit>
								<Box sx={{bgcolor: 'background.paper'}}>
									<Chatting roomNumber={room.id}/>
								</Box>
							</Collapse>
						</React.Fragment>
				))}
			</List>
	);
};

export default Chattings;
