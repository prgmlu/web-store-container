import {
	SET_ACTIVE_SCENE,
	SET_PRE_SCENE_VISIBILITY,
	SET_SCENE_VISIBILITY,
	SET_RENDER_UI,
} from './types';

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

export const setActiveScene = (sceneId) => (dispatch) => {
	dispatch({
		type: SET_ACTIVE_SCENE,
		payload: sceneId,
	});
};

export const setRenderUI = (state) => (dispatch) => {
	dispatch({
		type: SET_RENDER_UI,
		payload: state,
	});
};
