// Disabling import config as it eslint is unable to tell that it is coming from webpack externals.
// eslint-disable-next-line import/no-unresolved
import config from 'config';
import axiosApi from './axiosApi';
import { setScenes } from '../redux_store/scenesReducer/actions';
import { setStoreData } from '../redux_store/storeDataReducer';

export const getStoreData = () => (dispatch) =>
	axiosApi
		.get(`/v1/store-with-id?id=${config.STORE_ID}`)
		.then((res) => dispatch(setStoreData(res.data)))
		.catch((err) => Promise.reject(err.response));

export const getAllScenes = () => (dispatch) =>
	axiosApi
		.get(`/v1/scene/all?id=${config.STORE_ID}`)
		.then((res) => {
			dispatch(setScenes(res.data));
		})
		.catch((err) => Promise.reject(err.response));

export const getSceneObjects = (sceneId) =>
	axiosApi
		.get(`/v2/scene/objects?id=${sceneId}`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));

export const getProductData = (storeId, productId) =>
	axiosApi
		.get(`/v1/store/product?store_id=${config.STORE_ID}&product_id=${productId}`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));
