import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Box } from '@mui/material';

export default function SlideIn() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setIsOpen(open);
	};

	// Drawer 내부 아이템 리스트
	const list = () => (
			<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(true)}
					onKeyDown={toggleDrawer(true)}
			>
				<List>
					{['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((text) => (
							<ListItem button key={text}>
								<ListItemText primary={text} />
							</ListItem>
					))}
				</List>
			</Box>
	);

	return (
			<Box
					sx={{
						flexGrow: 1,
						transition: 'margin 0.5s ease-out',
						marginRight: isOpen ? '250px' : 0, // Drawer가 열리면 marginLeft을 적용하여 전체 화면을 밀어냄
					}}
			>
				<Button onClick={toggleDrawer(true)}>Open Slide-In</Button>
				<Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} variant="persistent">
					{list()}
				</Drawer>
				{/* 여기에 나머지 페이지 컨텐츠를 추가합니다. */}
				<Box>
					<p>여기는 기존 컨텐츠가 위치합니다. Drawer가 열리면 전체 페이지가 왼쪽으로 밀립니다.</p>
				</Box>
			</Box>
	);
}
