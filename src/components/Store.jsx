import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { initialize } from '../redux_stores/localizeReducer/actions';

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
import { setWebpSupport } from '../redux_stores/storeDataReducer/actions';

const Store = () => {
	const dispatch = useDispatch();

	const {
		id: storeId,
		loaded: storeDataLoaded,
		locales,
		locales_enabled: localesEnabled,
		default_locale: defaultLocale,
	} = useSelector((state) => state?.storeData || {});

	useEffect(() => {
		batch(() => {
			dispatch(getComponentConfig(storeId));
			dispatch(getStoreData(storeId));
			dispatch(getAllScenes(storeId));
			dispatch(getDefaultIcons());
			dispatch(setWebpSupport());
		});
	}, []);

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
		if (!localesEnabled) {
			return null;
		}

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

		if (defaultLocale) {
			return defaultLocale;
		}

		return null;
	};

	useEffect(() => {
		if (storeDataLoaded) {
			dispatch(
				initialize({
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
