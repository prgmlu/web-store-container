import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getLocalizedPath } from '../utils/urlHelpers';

const useLocalizedNavigation = () => {
	const activeLocaleSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize,
	);

	const { activeLocale } = useSelector(activeLocaleSelector);

	return {
		navigate: (sceneName) => {
			window.location.hash = getLocalizedPath(activeLocale, sceneName);
		},
	};
};

export default useLocalizedNavigation;
