import { SET_DEFAULT_ICONS } from './types';

const initialState = {};

export default function defaultIconsReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	switch (type) {
		case SET_DEFAULT_ICONS: {
			const defaultIcons = {};
			payload.forEach((item) => {
				defaultIcons[item.name] = item;
			});
			return { ...defaultIcons };
		}
		default:
			return state;
	}
}
