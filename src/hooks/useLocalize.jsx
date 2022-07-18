import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
	setTranslationsForLang,
	setActiveLocale,
} from '../redux_stores/localizeReducer/actions';

const useLocalize = () => {
	const dispatch = useDispatch();
	const enabled = useSelector((state) => state?.localize?.enabled);
	const locales = useSelector((state) => state?.localize?.locales || []);

	const activeLocaleSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize?.activeLocale,
	);

	const activeLocale = useSelector(activeLocaleSelector);

	return {
		activeLocale,
		enabled,
		locales,
		setActiveLocale: (locale) => {
			dispatch(setActiveLocale(locale));
		},
		setTranslationsForLang: (lang, trans) => {
			dispatch(
				setTranslationsForLang({
					lang,
					translations: trans,
				}),
			);
		},
	};
};

export default useLocalize;
