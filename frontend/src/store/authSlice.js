import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
		'auth/loginUser',
		async (userData, {rejectWithValue}) => {
			try {
				const response = await axios.post('https://localhost:8080/user/login', userData);
				return response.data;
			} catch (error) {
				return rejectWithValue(error.response.data);
			}
		}
);

export const logoutUser = createAsyncThunk(
		'auth/logoutUser',
		async (_, { rejectWithValue }) => {
			try {
				localStorage.removeItem('token');
				return true;
			} catch (error) {
				return rejectWithValue(error.response.data);
			}
		}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: null,
		isAuthenticated: false,
		loading: true,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.loading = false;
		},
	},
	extraReducers: {
		[loginUser.fulfilled]: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.loading = false;
		},
		[loginUser.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[logoutUser.fulfilled]: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
		[logoutUser.rejected]: (state, action) => {
			state.error = action.payload;
		}
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;