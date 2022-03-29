import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const useTranslate = () => {
	const translationsSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize?.translations || {},
	);

	// const translations = {};
	const translations = useSelector(translationsSelector);
	const activeLocaleSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize,
	);

	const { activeLocale, defaultLocale } = useSelector(activeLocaleSelector);

	return {
		translate: (literal, defaultTranslation) => {
			if (
				activeLocale in translations &&
				literal in translations[activeLocale]
			) {
				return translations[activeLocale][literal];
			}
			if (
				defaultLocale in translations &&
				literal in translations[defaultLocale]
			) {
				return translations[defaultLocale][literal];
			}
			if (defaultTranslation) {
				return defaultTranslation;
			}
			return 'No translation found';
		},
	};
};

export default useTranslate;
