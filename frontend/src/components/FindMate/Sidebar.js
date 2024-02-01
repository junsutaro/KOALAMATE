import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ children }) => {
	const [isOpen, setOpen] = useState(false);

	const toggleSidebar = () => {
		setOpen(!isOpen);
	};

	return (
			<>
				<button onClick={toggleSidebar} className={styles.toggleButton}>
					{isOpen ? 'Close' : 'Open'}
				</button>
				<div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
					{children}
				</div>
			</>
	);
};

export default Sidebar;
