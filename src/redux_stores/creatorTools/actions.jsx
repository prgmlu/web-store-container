import { SETUP_CREATOR_TOOLS } from './types';

const DEFAULT_PAN_SPEED = 2.0;

const makeOptions = (config) => {
	let panSpeed = DEFAULT_PAN_SPEED;

	if ('panSpeed' in config) {
		panSpeed = parseFloat(config.panSpeed);
	}

	if ('pan' in config) {
		if (['left', 'right'].includes(config.pan)) {
			if (config.pan === 'right') {
				panSpeed = -panSpeed;
			}
		}
	}

	return {
		...config,
		panSpeed,
		autoPan: 'autopan' in config ? config.autopan : 'false',
		hideOverlay: 'hideoverlay' in config ? config.hideoverlay : 'false',
		hideProductHotspots: 'phs' in config && config.phs === 'uihide',
		hideContentHotspots: 'chs' in config && config.chs === 'uihide',
		hideNavigation: 'nav' in config && config.nav === 'uihide',
	};
};

export const setupCreatorTools = () => (dispatch) => {
	const url = new URL(window.location.toString());
	const urlParams = url.searchParams;
	let payload = {
		isEnabled: false,
	};
	if (urlParams.has('creatortools')) {
		const creatorToolsEnabled = urlParams.get('creatortools') === 'true';
		makeOptions(Object.fromEntries(urlParams.entries()));
		if (creatorToolsEnabled) {
			payload = {
				...makeOptions(Object.fromEntries(urlParams.entries())),
				isEnabled: creatorToolsEnabled,
			};
		}
	}
	dispatch({
		type: SETUP_CREATOR_TOOLS,
		payload,
	});
};
