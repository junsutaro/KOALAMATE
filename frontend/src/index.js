import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {WebSocketProvider} from './context/WebSocketContext';
import store from 'store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<Provider store={store}>
			<WebSocketProvider>
				<React.StrictMode>
					<App/>
				</React.StrictMode>
			</WebSocketProvider>
		</Provider>,
);
