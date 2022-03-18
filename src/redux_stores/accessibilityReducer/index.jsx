import {
	SET_TOTAL_NAV_MARKER_INDEXES,
	RESET_CURRENT_ACCESSIBILITY_NAV_IDX,
	HANDLE_LEFT_ARROW_KEY_ACCESSIBILITY_NAV_IDX,
	HANDLE_RIGHT_ARROW_KEY_ACCESSIBILITY_NAV_IDX,
} from './types';
import {
	handleLeftArrowKeyAccessibilityNavIdx,
	handleRightArrowKeyAccessibilityNavIdx,
} from './actions';

const initialState = {
	navMarkerCount: undefined,
	currentAccessibilityNavIdx: undefined,
	handleLeftArrowKeyAccessibilityNavIdx,
	handleRightArrowKeyAccessibilityNavIdx,
};

export default function accessibilityReducer(
	state = initialState,
	action = {},
) {
	const { type, payload } = action;
	const { currentAccessibilityNavIdx, navMarkerCount } = state;
	let updatedIdx;

	switch (type) {
		case SET_TOTAL_NAV_MARKER_INDEXES:
			return { ...state, navMarkerCount: payload };

		case HANDLE_LEFT_ARROW_KEY_ACCESSIBILITY_NAV_IDX:
			if (currentAccessibilityNavIdx === undefined) {
				updatedIdx = 0;
			} else if (currentAccessibilityNavIdx <= 0) {
				updatedIdx = navMarkerCount - 1;
			} else {
				updatedIdx = (currentAccessibilityNavIdx - 1) % navMarkerCount;
			}
			return { ...state, currentAccessibilityNavIdx: updatedIdx };

		case HANDLE_RIGHT_ARROW_KEY_ACCESSIBILITY_NAV_IDX:
			if (currentAccessibilityNavIdx === undefined) {
				updatedIdx = 0;
			} else {
				updatedIdx = (currentAccessibilityNavIdx + 1) % navMarkerCount;
			}
			return { ...state, currentAccessibilityNavIdx: updatedIdx };

		case RESET_CURRENT_ACCESSIBILITY_NAV_IDX:
			return { ...state, currentAccessibilityNavIdx: undefined };

		default:
			return state;
	}
}
