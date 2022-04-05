import { SET_STORE_DATA, SET_WEBP_SUPPORT } from './types';
import { getStoreIdFromHtml } from '../../utils/htmlHelpers';

const initialState = {
	id: getStoreIdFromHtml(),
	scenes: [],
	loaded: false,
	supportsWebp: true,
};

export default function storeDataReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	switch (type) {
		case SET_STORE_DATA:
			return {
				...state,
				...payload,
			};
		case SET_WEBP_SUPPORT:
			return {
				...state,
				supportsWebp: payload,
			};
		default:
			return state;
	}
}
