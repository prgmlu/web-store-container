import { SET_SCENES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setScenes = (data) => {
	console.log('=> setScenes', data);
	return {
		type: SET_SCENES,
		payload: data,
	};
};
