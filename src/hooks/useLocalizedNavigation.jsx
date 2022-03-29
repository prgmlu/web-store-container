import { useNavigate } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getLocalizedPath } from '../utils/urlHelpers';

const useLocalizedNavigation = () => {
	const navigate = useNavigate();

	const activeLocaleSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize,
	);

	const { activeLocale } = useSelector(activeLocaleSelector);

	return {
		navigate: (sceneName) => {
			navigate(getLocalizedPath(activeLocale, sceneName));
		},
	};
};

export default useLocalizedNavigation;
