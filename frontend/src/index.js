import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {WebSocketProvider} from './context/WebSocketContext';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<WebSocketProvider>
					<React.StrictMode>
						<App/>
					</React.StrictMode>
				</WebSocketProvider>
			</PersistGate>
		</Provider>,
);
