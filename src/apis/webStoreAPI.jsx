// Disabling import config as it eslint is unable to tell that it is coming from webpack externals.
// eslint-disable-next-line import/no-unresolved
import axiosApi from './axiosApi';
import { setScenes } from '../redux_stores/scenesReducer/actions';
import componentConfig from './sampleComponentMap';
import { setComponentConfig } from '../redux_stores/componentConfigReducer/actions';
import { setStoreData } from '../redux_stores/storeDataReducer/actions';
import { setDefaultIcons } from '../redux_stores/defaultIconsReducer/actions';
import config from 'config';

export const getStoreData = (storeId) => (dispatch) =>
	axiosApi
		.get(`/v1/store-with-id?id=${storeId}`)
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
		.get(`/v1/scene/all?id=${storeId}`)
		.then((res) => {
			dispatch(setScenes(res.data));
		})
		.catch((err) => Promise.reject(err.response));

export const getSceneObjects = (sceneId, locale) => {
	let prefix = `/v2/scene/objects`;

	const requestParams = new URLSearchParams({
		id: sceneId,
	});

	if (locale && locale.length > 0) {
		prefix = `/v2/scene/objects-with-locale`;
		requestParams.locale = locale;
	}

	return axiosApi
		.get(`${prefix}?${requestParams}`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));
};

export const getComponentConfigApi = (storeId) => {
	const urlPath = `/v1/component_config?storeId=${storeId}`;
	return axiosApi
		.get(urlPath)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

export const getComponentConfig = (storeId) => (dispatch) => {
	if (config.ENV === 'dev') {
		dispatch(setComponentConfig(componentConfig[storeId]));
	} else {
		getComponentConfigApi(storeId)
			.then((data) => dispatch(setComponentConfig(data)))
			.catch((err) => console.error(err));
	}
};

export const getDefaultIcons = () => (dispatch) =>
	axiosApi
		.get(`v1/default_icons`)
		.then((res) => dispatch(setDefaultIcons(res.data)))
		.catch((err) => Promise.reject(err.response));
