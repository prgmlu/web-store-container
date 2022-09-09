// Disabling import config as it eslint is unable to tell that it is coming from webpack externals.
// eslint-disable-next-line import/no-unresolved
import config from 'config';
import axiosApi from './axiosApi';
import { setScenes } from '../redux_stores/scenesReducer/actions';
import { setComponentConfig } from '../redux_stores/componentConfigReducer/actions';
import { setStoreData } from '../redux_stores/storeDataReducer/actions';
import { setDefaultIcons } from '../redux_stores/defaultIconsReducer/actions';

const reqCacheOptions = {
	ttl: 1000 * 60 * 15,
	interpretHeader: false,
	methods: ['get'],
	cachePredicate: {
		statusCheck: (status) => status >= 200 && status < 400,
	},
};

export const getStoreData = (storeId) => (dispatch) =>
	axiosApi
		.get(`${config.API_URL}/v1/store-with-id?id=${storeId}`)
		.then((res) =>
			dispatch(
				setStoreData({
					...res.data,
					loaded: true,
				}),
			),
		)
		.catch((err) => Promise.reject(err.response));

export const getAllScenes = (storeId) => (dispatch) =>
	axiosApi
		.get(`${config.API_URL}/v1/scene/all?id=${storeId}`)
		.then((res) => {
			dispatch(setScenes(res.data));
		})
		.catch((err) => Promise.reject(err.response));

export const getSceneObjects = (sceneId, locale, verifyProducts = true) => {
	let prefix = `${config.API_URL}/v2/scene/objects`;

	const requestParams = new URLSearchParams({
		id: sceneId,
	});
	if (locale && locale.length > 0) {
		prefix = `${config.API_URL}/v2/scene/objects-with-locale`;
		requestParams.set('locale', locale);
	}

	if (verifyProducts) {
		requestParams.set('verify_products', verifyProducts);
	}

	return axiosApi
		.get(`${prefix}?${requestParams}`, {
			cache: reqCacheOptions,
		})
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));
};

export const getComponentConfigApi = (storeId) => {
	const urlPath = `${config.API_URL}/v1/component_config?storeId=${storeId}`;
	return axiosApi
		.get(urlPath)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

export const getComponentConfig = (storeId) => (dispatch) => {
	if (config.ENV === 'dev') {
		import('../../configs/components.json').then((result) =>
			dispatch(setComponentConfig(result)),
		);
	} else {
		getComponentConfigApi(storeId)
			.then((data) => dispatch(setComponentConfig(data)))
			.catch((err) => console.error(err));
	}
};

export const getDefaultIcons = () => (dispatch) =>
	axiosApi
		.get(`${config.API_URL}/v1/default_icons`)
		.then((res) => dispatch(setDefaultIcons(res.data)))
		.catch((err) => Promise.reject(err.response));
