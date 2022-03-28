import { SET_STORE_DATA } from './types';
import { getStoreIdFromHtml } from '../../utils/htmlHelpers';

const initialState = {
	id: getStoreIdFromHtml(),
	scenes: [],
	loaded: false,
};

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
