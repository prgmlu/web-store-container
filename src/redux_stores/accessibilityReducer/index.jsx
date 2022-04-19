import {
	SET_ACCESSIBILITY_SELECTOR,
	SET_ACTIVE_NAV_INDEX,
	SET_NAV_MARKER_COUNT,
	SET_ACTIVE_HOTSPOT_INDEX,
	SET_HOTSPOT_MARKER_COUNT,
} from './types';

const initialState = {
	accessibilitySelector: undefined, // either 'navigation' or 'hotspot'
	activeNavIndex: undefined,
	navMarkerCount: 0,
	activeHotspotIndex: undefined,
	hotspotMarkerCount: 0,
};

export default function accessibilityReducer(
	state = initialState,
	action = {},
) {
	const { type, payload } = action;

	switch (type) {
		case SET_ACCESSIBILITY_SELECTOR:
			return { ...state, accessibilitySelector: payload };
		case SET_ACTIVE_NAV_INDEX:
			return { ...state, activeNavIndex: payload };
		case SET_NAV_MARKER_COUNT:
			return { ...state, navMarkerCount: payload };
		case SET_ACTIVE_HOTSPOT_INDEX:
			return { ...state, activeHotspotIndex: payload };
		case SET_HOTSPOT_MARKER_COUNT:
			return { ...state, hotspotMarkerCount: payload };
		default:
			return state;
	}
}
