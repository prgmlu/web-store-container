import { createSlice } from '@reduxjs/toolkit';

const roomObjectsSlice = createSlice({
	name: 'room_objects',
	initialState: [],
	reducers: {
		setRoomObjects: (state, action) => {
			return { ...action.payload };
		},
	},
});

export default roomObjectsSlice.reducer;
