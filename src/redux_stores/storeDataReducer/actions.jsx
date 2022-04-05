import supportsWebP from 'supports-webp';
import { SET_STORE_DATA, SET_WEBP_SUPPORT } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setStoreData = (data) => ({
	type: SET_STORE_DATA,
	payload: { ...data, client_link_config: { show: false } },
});

export const setWebpSupport = () => (dispatch) => {
	supportsWebP.then((webpSupported) =>
		dispatch({
			type: SET_WEBP_SUPPORT,
			payload: webpSupported,
		}),
	);
};
