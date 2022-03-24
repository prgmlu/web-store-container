import { SET_PRE_SCENE_VISIBILITY, SET_SCENE_VISIBILITY } from './types';

export const setPreScreenVisibility = (visibility) => (dispatch) => {
	dispatch({
		type: SET_PRE_SCENE_VISIBILITY,
		payload: visibility,
	});
};

export const setSceneVisibility = (visibility) => (dispatch) => {
	dispatch({
		type: SET_SCENE_VISIBILITY,
		payload: visibility,
	});
};
