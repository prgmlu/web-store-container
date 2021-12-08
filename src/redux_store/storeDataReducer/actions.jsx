import { SET_STORE_DATA } from './types';

const initialState = {};

export default function storeDataReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	switch (type) {
		case SET_STORE_DATA:
			return {
				...payload,
			};
		default:
			return state;
	}
}
