import {
	SET_ACCESSIBILITY_SELECTOR,
	SET_ACTIVE_NAV_INDEX,
	SET_NAV_MARKER_COUNT,
	SET_ACTIVE_HOTSPOT_INDEX,
	SET_HOTSPOT_MARKER_COUNT,
} from './types';

export const setAccessibilitySelector = (data) => ({
	type: SET_ACCESSIBILITY_SELECTOR,
	payload: data,
});

export const setActiveNavIndex = (data) => ({
	type: SET_ACTIVE_NAV_INDEX,
	payload: data,
});

export const setNavMarkerCount = (data) => ({
	type: SET_NAV_MARKER_COUNT,
	payload: data,
});

export const setActiveHotspotIndex = (data) => ({
	type: SET_ACTIVE_HOTSPOT_INDEX,
	payload: data,
});

export const setHotspotMarkerCount = (data) => ({
	type: SET_HOTSPOT_MARKER_COUNT,
	payload: data,
});
