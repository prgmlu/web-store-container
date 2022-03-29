import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import {
	getAllScenes,
	getComponentConfig,
	getDefaultIcons,
	getStoreData,
} from '../apis/webStoreAPI';
import UILayer from './loaders/UILayer';
import ModulesLayer from './loaders/ModulesLayer';
import AnalyticsLayer from './loaders/AnalyticsLayer';
import { getLocaleFromHtml } from '../utils/htmlHelpers';
import useLocalize from '../hooks/useLocalize';

const Store = () => {
	const dispatch = useDispatch();
	const storeId = useSelector((state) => state?.storeData?.id);
	const storeDataLoaded = useSelector((state) => state.storeData.loaded);
	const localize = useLocalize();

	useEffect(() => {
		dispatch(getComponentConfig(storeId));
		dispatch(getStoreData(storeId));
		dispatch(getDefaultIcons());
		dispatch(getAllScenes(storeId));
	}, []);

	const locales = useSelector((state) => state.storeData.locales);

	const defaultLocale = useSelector(
		(state) => state.storeData.default_locale,
	);

	const getLocaleFromHashPath = () => {
		/*
		 * Possibilities
		 * -
		 * - #/
		 * - #/sceneName
		 * - #/locale/sceneName
		 *
		 * */
		const hashpath = window.location.hash;

		if (!hashpath) {
			return null;
		}

		const hashPathParts = hashpath.split('/');
		if (hashPathParts.length >= 2) {
			if (locales.includes(hashPathParts[1])) {
				return hashPathParts[1];
			}
		}

		return null;
	};

	const getActiveLocale = () => {
		/*
		 * Priorities
		 * -
		 * */

		/* Return locale from hashPath */
		const localeFromHashPath = getLocaleFromHashPath();
		if (localeFromHashPath && localeFromHashPath !== '') {
			return localeFromHashPath;
		}

		/* Return locale from html input var */
		const localeFromHtml = getLocaleFromHtml();
		if (localeFromHtml && localeFromHtml !== '') {
			return localeFromHtml;
		}

		return null;
	};

	useEffect(() => {
		if (storeDataLoaded) {
			dispatch(
				localize.initialize({
					locales,
					defaultLocale,
					activeLocale: getActiveLocale(),
					fallBackLocale: defaultLocale,
				}),
			);
		}
	}, [storeDataLoaded]);

	return (
		storeDataLoaded && (
			<Router>
				<UILayer />
				<ModulesLayer />
				<AnalyticsLayer />
			</Router>
		)
	);
};

export default Store;
