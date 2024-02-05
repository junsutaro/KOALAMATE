import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import Map from 'components/FindMate/Map';

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
					sx={{
						width: 300,
						marginTop: '70px', // 네비게이션 바 높이만큼 marginTop 설정
						// height: `calc(100% - 70px)`
			}}
					role="presentation"
					onClick={toggleDrawer(false)} // Here, toggling to false on click to close the drawer
					onKeyDown={toggleDrawer(false)} // Same for keydown
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
						marginLeft: isOpen ? '300px' : 0, // 변경된 부분: Drawer가 열리면 marginLeft을 적용하여 전체 화면을 오른쪽으로 밀어냄
					}}
			>
				<Button onClick={toggleDrawer(true)}>Open Slide-In</Button>
				<Drawer anchor="left" openan={isOpen} onClose={toggleDrawer(false)} variant="persistent">
					{list()} {/* Drawer 내부 리스트를 렌더링 */}
				</Drawer>
				{/* 여기에 나머지 페이지 컨텐츠를 추가합니다. */}
				<Box>
					<p>여기는 기존 컨텐츠가 위치합니다. Drawer가 열리면 전체 페이지가 오른쪽으로 밀립니다.</p>
					<Map/>
				</Box>
			</Box>
	);
}
