import {
	SET_TOTAL_NAV_MARKER_INDEXES, 
	RESET_CURRENT_ACCESSIBILITY_NAV_IDX,
	HANDLE_LEFT_ARROW_KEY_ACCESSIBILITY_NAV_IDX,
	HANDLE_RIGHT_ARROW_KEY_ACCESSIBILITY_NAV_IDX,
} from './types';

export const setNavMarkerCount = (data) => ({
	type: SET_TOTAL_NAV_MARKER_INDEXES,
	payload: data,
});

export const handleLeftArrowKeyAccessibilityNavIdx = () => ({
	type: HANDLE_LEFT_ARROW_KEY_ACCESSIBILITY_NAV_IDX
})

export const handleRightArrowKeyAccessibilityNavIdx = () => ({
	type: HANDLE_RIGHT_ARROW_KEY_ACCESSIBILITY_NAV_IDX
})

export const resetCurrentAccessibilityNavIdx = () => ({
	type: RESET_CURRENT_ACCESSIBILITY_NAV_IDX,
});
