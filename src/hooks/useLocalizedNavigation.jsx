import { useNavigate } from 'react-router';
import config from 'config';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getLocalizedPath } from '../utils/urlHelpers';

const useLocalizedNavigation = () => {
	const activeLocaleSelector = createSelector(
		(state) => state?.localize || {},
		(localize) => localize,
	);
	const navigate = useNavigate();
	const { activeLocale } = useSelector(activeLocaleSelector);
	const showLocaleInClientLink = useSelector(
		(state) => state?.storeData?.show_locale_on_client_link === true,
	);
	return {
		navigate: (sceneName) => {
			navigate(
				config.ENV !== 'client' || showLocaleInClientLink
					? getLocalizedPath(activeLocale, sceneName)
					: getLocalizedPath('', sceneName),
			);
		},
	};
};

export default useLocalizedNavigation;
