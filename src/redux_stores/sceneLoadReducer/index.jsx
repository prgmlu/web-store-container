import {
	SET_PRE_SCENE_VISIBILITY,
	SET_SCENE_VISIBILITY,
	SET_ACTIVE_SCENE,
} from './types';

const initialState = {
	preScreenVisible: true,
	renderScene: false,
	activeScene: '',
	previousScene: '',
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
		case SET_ACTIVE_SCENE: {
			return {
				...state,
				previousScene: state.activeScene,
				activeScene: payload,
			};
		}
		default:
			return state;
	}
};

export default sceneLoadReducer;
