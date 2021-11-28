import axiosApi from './axiosApi';
import config from 'config';

export const getStoreData = () => {
    return axiosApi.get(`/v1/store-with-id?id=${config.STORE_ID}`).then(res => res).catch(err => Promise.reject(err.response))
}
