import {
	SET_STORE_MUSIC_REF,
	SET_STORE_MUSIC_PLAY_STATE,
	PUSH_TO_MEDIA_STACK,
	POP_FROM_MEDIA_STACK,
	CLEAR_MEDIA_STACK,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const setStoreMusicRef = (ref) => ({
	type: SET_STORE_MUSIC_REF,
	payload: ref,
});

export const setStoreMusicPlayState = (info) => ({
	type: SET_STORE_MUSIC_PLAY_STATE,
	payload: info,
});

// stack fns
export const pushToMediaStack = (ref) => ({
	type: PUSH_TO_MEDIA_STACK,
	payload: ref,
});

export const popFromMediaStack = () => ({
	type: POP_FROM_MEDIA_STACK,
});

export const clearMediaStack = () => ({
	type: CLEAR_MEDIA_STACK,
});
