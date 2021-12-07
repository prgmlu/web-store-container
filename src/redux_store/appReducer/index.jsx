import { SET_SCENES } from './types';

const initialState = {
	scenes: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_SCENES: {
			const newScenes = {};
			payload.forEach((item) => {
				newScenes[item.id] = item;
			});
			return {
				...state,
				scenes: newScenes,
			};
		}
		default:
			return state;
	}
}
