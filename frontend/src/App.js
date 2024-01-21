import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		axios.get('/test').then(response => {
			setMessage(response.data);
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}, []);

	const [message2, setMessage2] = useState('');

	useEffect(() => {
		axios.get('/test2').then(response => {
			setMessage2(response.data);
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}, []);

	return (

			<div className="App">
				<header className="App-header">
					<p>Server says: {message}</p>
					<p>Server2 says: {message2}</p>
				</header>
			</div>
	);
}

export default App;
