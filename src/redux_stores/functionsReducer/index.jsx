// eslint-disable-next-line import/no-unresolved
// import modules from 'product_data_module/modules';
import { REGISTER_SHAREABLE, SET_FUNCTIONS } from './types';
import axiosApi from '../../apis/axiosApi';
import { formURL } from '../../utils/apiUtils';
import useTranslate from '../../hooks/useTranslate';
import useLocalize from '../../hooks/useLocalize';
import useLocalizedNavigation from '../../hooks/useLocalizedNavigation';
import useAnalytics from '../../hooks/useAnalytics';

const initialState = {
	axios: axiosApi,
	formURL,
	useTranslate,
	useLocalize,
	useLocalizedNavigation,
	useAnalytics,
};

export default function functionsReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	switch (type) {
		case SET_FUNCTIONS:
			return { ...payload };
		case REGISTER_SHAREABLE: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
}
