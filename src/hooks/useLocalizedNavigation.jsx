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
	const hideLocaleInClientLink =
		config.ENV === 'client' &&
		useSelector(
			(state) =>
				state?.storeData?.show_locale_on_client_link === false || false,
		);
	return {
		navigate: (sceneName) => {
			navigate(
				hideLocaleInClientLink
					? getLocalizedPath('', sceneName)
					: getLocalizedPath(activeLocale, sceneName),
			);
		},
	};
};

export default useLocalizedNavigation;
