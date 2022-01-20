import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import config from 'config';

// const cachedRequests = {};

const instance = axios.create({
	baseURL: config.API_URL,
	crossDomain: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

// instance.interceptors.request.use((request) => {
// 	const { method, url, headers } = request;
// 	if (method === 'get') {
// 		if (!headers?.cache && url in cachedRequests) {
// 			delete cachedRequests[url];
// 		}
//
// 		if (headers?.cache) {
// 			delete request.headers.cache;
// 		}
//
// 		if (url in cachedRequests) {
// 			request.adapter = () => {
// 				return Promise.resolve(cachedRequests[url]);
// 			};
// 		}
// 	}
// 	return request;
// });
//
// instance.interceptors.response.use((response) => {
// 	const { method, url } = response.config;
// 	if (method === 'get') {
// 		cachedRequests[url] = response;
// 	}
// 	return response;
// });

const handleSuccess = (response) => response;

const handleError = ({ error }) => Promise.reject(error);

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
