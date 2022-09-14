import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEnabled: false,
};

const creatorTools = createSlice({
	name: 'creatorTools',
	initialState,
	reducers: {
		setup(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
	},
});

export default creatorTools.reducer;
