import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // 메뉴 아이콘
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // 닫기 아이콘
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // RTL 지원을 위한 아이콘

const drawerWidth = 360; // Drawer의 너비 설정

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
		({ theme, open }) => ({
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: 0,
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: drawerWidth, // Drawer가 열릴 때 Main 컨텐츠가 Drawer 너비만큼 밀려나도록 설정
			}),
		}),
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return (
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerToggle}
						edge="start"
						sx={{ marginLeft: 1, ...(open && { display: 'none' }) }}
				>
					<MenuIcon />
				</IconButton>
				<Drawer
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							'& .MuiDrawer-paper': {
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
						variant="persistent"
						anchor="left"
						open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerToggle}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</DrawerHeader>
					{/* Drawer 내부 내용 추가 영역 */}
				</Drawer>
				<Main open={open}>
					<DrawerHeader />
					{/* 페이지 주 내용 */}
				</Main>
			</Box>
	);
}
