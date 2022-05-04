import {
	SET_STORE_MUSIC_REF,
	SET_STORE_MUSIC_PLAY_STATE,
	PUSH_TO_MEDIA_STACK,
	POP_FROM_MEDIA_STACK,
	CLEAR_MEDIA_STACK,
} from './types';
import {
	setStoreMusicRef,
	setStoreMusicPlayState,
	pushToMediaStack,
	popFromMediaStack,
	clearMediaStack,
} from './actions';

const initialState = {
	storeMusicRef: null,
	storeMusicPlayState: true,
	storeMusicPrevPlayState: true,
	mediaStack: [],

	// refs and fns
	setStoreMusicRef,
	setStoreMusicPlayState,
	pushToMediaStack,
	popFromMediaStack,
	clearMediaStack,
};

const UNSUPPORTED_TAGS = ['IFRAME'];

const pauseTopRef = (ref) => {
	if (UNSUPPORTED_TAGS.includes(ref.current.tagName)) {
		return
	};

	if (ref.current instanceof Element) {
		return ref.current.pause();
	}
	// ref is a react-player object
	return ref.current.getInternalPlayer().pause();
};

const playTopRef = (ref) => {
	if (UNSUPPORTED_TAGS.includes(ref.current.tagName)) {
		return
	};

	if (ref.current instanceof Element) {
		return ref.current.play();
	}
	// ref is a react-player object
	return ref.current.getInternalPlayer().play();
};

export default function mediaControllerReducer(
	state = initialState,
	action = {},
) {
	const { type, payload } = action;

	switch (type) {
		case SET_STORE_MUSIC_REF:
			return { ...state, storeMusicRef: payload };

		case SET_STORE_MUSIC_PLAY_STATE:
			if (payload.userToggled) {
				return {
					...state,
					storeMusicPlayState: payload.playState,
					storeMusicPrevPlayState: payload.playState,
				};
			}
			return {
				...state,
				storeMusicPlayState:
					payload.playState && state.storeMusicPrevPlayState,
			};

		case PUSH_TO_MEDIA_STACK:
			if (state.mediaStack.length > 0) {
				pauseTopRef(state.mediaStack.at(-1));
			}
			const updatedPushedStack = [...state.mediaStack, payload];
			return { ...state, mediaStack: updatedPushedStack };

		case POP_FROM_MEDIA_STACK:
			if (state.mediaStack.length <= 0) {
				return {
					...state,
					storeMusicPlayState: state.storeMusicPrevPlayState,
				};
			}

			pauseTopRef(state.mediaStack.at(-1));
			const updatedPoppedStack = state.mediaStack.slice(0, -1);
			if (updatedPoppedStack.length > 0) {
				playTopRef(updatedPoppedStack.at(-1));
			}
			return { ...state, mediaStack: updatedPoppedStack };

		case CLEAR_MEDIA_STACK:
			return { ...state, mediaStack: [] };

		default:
			return state;
	}
}
