import { createSlice } from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
	token: null,
	name: null,
	email: null,
	cible: null,
	enfant:null,
	id:null,
	intro:null

};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		login: (state, action) => {
			state.token = action.payload.token;
		},
		updateUserData: (state, action) => {
			state.name = action.payload.name !== undefined ? action.payload.name : state.name;
			state.email = action.payload.email !== undefined ? action.payload.email : state.email;
			state.cible = action.payload.cible !== undefined ? action.payload.cible : state.cible;
			state.enfant = action.payload.enfant !== undefined ? action.payload.enfant : state.enfant;
			state.id = action.payload.id !== undefined ? action.payload.id : state.id;
			state.intro = action.payload.intro !== undefined ? action.payload.intro : state.intro;		},
		logout: (state) => {
			state.token = null;
			state.name= null;
		  },
	},
});

export const {login, logout, updateUserData} = userSlice.actions;

export default userSlice.reducer;
