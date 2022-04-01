import { createSlice } from '@reduxjs/toolkit';
import { CART_REDUCER_NAME } from './types';

const initialState = {};

const setCartItems = (state, action) => {
	return { ...state, ...action.payload };
};

const cartSlice = createSlice({
	name: CART_REDUCER_NAME,
	initialState,
	reducers: {
		setCartItems,
	},
});

export default cartSlice.reducer;
