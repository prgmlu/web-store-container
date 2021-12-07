import axios from 'axios';
import config from 'config';

const instance = axios.create({
	baseURL: config.API_URL,
	crossDomain: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

const handleSuccess = (response) => response;

const handleError = ({ error }) => Promise.reject(error);

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
