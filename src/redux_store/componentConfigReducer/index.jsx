import { SET_COMPONENT_CONFIG } from './types';

const initialState = {};

export default function componentConfigReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	switch (type) {
		case SET_COMPONENT_CONFIG:
			return { ...payload };
		default:
			return state;
	}
}
