import axios from 'obsess_libs/axios';
import config from 'config';

const instance = axios.create({
    baseURL: config.API_URL,
    crossDomain: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


const handleSuccess = (response) => {
    return response;
};

const handleError = (error, xx) => {
    return Promise.reject(error);
};

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
