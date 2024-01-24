import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from 'store/authSlice';

export const store = configureStore({
	reducer: {
		auto: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});