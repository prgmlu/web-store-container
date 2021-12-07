import config from 'config';
import axiosApi from './axiosApi';
import { setScenes } from '../redux_store/appReducer/actions';

export const getStoreData = () =>
	axiosApi
		.get(`/v1/store-with-id?id=${config.STORE_ID}`)
		.then((res) => res)
		.catch((err) => Promise.reject(err.response));

export const getAllScenes = () => (dispatch) =>
	axiosApi
		.get(`/v1/scene/all?id=${config.STORE_ID}`)
		.then((res) => {
			dispatch(setScenes(res.data));
		})
		.catch((err) => console.error(err));

export const getSceneObjects = (sceneId) =>
	axiosApi
		.get(`/v2/scene/objects?id=${sceneId}`)
		.then((res) => res.data)
		.catch((err) => console.error(err));
