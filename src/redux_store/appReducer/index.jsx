import { SET_SCENES } from './types';

const initialState = {
	scenes: [],
};

export default (action, state = initialState) => {
	switch (action.type) {
		case SET_SCENES: {
			const newScenes = {};
			action.payload.forEach((item) => {
				newScenes[item.id] = item;
			});
			return {
				...state,
				scenes: newScenes,
			};
		}
		default: {
			return state;
		}
	}
};
