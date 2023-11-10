import { createSlice } from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
	token: null,
	name: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		login: (state, action) => {
			state.token = action.payload.token;
			state.name = action.payload.name;
		},
		logout: (state) => {
			state.token = null;
			state.name= null;
		  },
	},
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
