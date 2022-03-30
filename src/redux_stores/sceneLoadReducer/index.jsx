import { SET_PRE_SCENE_VISIBILITY, SET_SCENE_VISIBILITY } from './types';

const initialState = {
	preScreenVisible: true,
	renderScene: false,
};

const sceneLoadReducer = (state = initialState, action = {}) => {
	const { type, payload } = action;
	switch (type) {
		case SET_PRE_SCENE_VISIBILITY: {
			return { ...state, preScreenVisible: payload };
		}
		case SET_SCENE_VISIBILITY: {
			return { ...state, renderScene: payload };
		}
		default:
			return state;
	}
};

export default sceneLoadReducer;
