import { createSlice } from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
	width: null,
	height: null,
};

export const windowSizeSlice = createSlice({
	name: 'windowSize',
	initialState,
	reducers: {

		updateWindowSize: (state, action) => {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
	},
});

export const {updateWindowSize} = windowSizeSlice.actions;

export default windowSizeSlice.reducer;
