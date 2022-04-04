import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import supportsWebP from 'supports-webp';
import config from 'config';
import Room from './Room';
import useLocalize from '../hooks/useLocalize';

const RoomRoutes = () => {
	const navigate = useNavigate();
	const scenes = useSelector((state) => state?.scenes || {});
	const storeDataScenes = useSelector(
		(state) => state?.storeData.scenes || [],
	);

	const [webpSupport, setWebpSupport] = useState(true);
	const renderScene = useSelector((state) => state.sceneLoad.renderScene);
	const showClientLinkLocale = useSelector(
		(state) => state.storeData?.client_link_config?.show === true,
	);

	useEffect(() => {
		supportsWebP.then((webpSupported) => setWebpSupport(webpSupported));
	}, []);

	console.log('=> RoomRoutes: webpSupport');

	const { activeLocale, locales } = useLocalize();

	const shouldShowLocale = () => {
		if (config.ENV !== 'client') {
			return true;
		}
		return showClientLinkLocale === true;
	};

	const getDefaultRedirect = () => {
		/*
		 * Cases
		 * - #/
		 * - #/locale_code/scene_name
		 * - #/scene_name
		 *
		 * */
		if (!shouldShowLocale()) {
			return null;
		}

		// Case: #/
		const hashPath = window.location.hash;

		if (hashPath === '#/' || hashPath === '') {
			return `/${activeLocale}`;
		}

		// Case: #/localeCode/anyString
		const hashPathParts = hashPath.split('/');
		if (locales.includes(hashPathParts[1])) {
			return null;
		}

		// Case: #/anyString
		return hashPath.replace('#', `/${activeLocale}`);
	};

	const getLocalizedPath = (sceneName) => {
		if (shouldShowLocale() && activeLocale && activeLocale !== '') {
			return `${activeLocale}/${sceneName}`;
		}
		return sceneName;
	};

	useEffect(() => {
		if (activeLocale) {
			const defaultRedirect = getDefaultRedirect();
			if (defaultRedirect) {
				navigate(defaultRedirect);
			}
		}
	}, [activeLocale]);

	const getRoutes = () => {
		if (Object.keys(scenes).length === 0) {
			return null;
		}

		const routes = Object.keys(scenes).map((sceneId) => {
			const scene = scenes[sceneId];
			return (
				<Route
					key={scene.id}
					path={getLocalizedPath(scene.name)}
					element={
						<Room sceneData={scene} webpSupport={webpSupport} />
					}
				/>
			);
		});

		const firstScene = scenes[storeDataScenes[0]];
		if (firstScene) {
			routes.push(
				<Route
					key="initial"
					path={getLocalizedPath('/')}
					element={
						<Room
							sceneData={firstScene}
							webpSupport={webpSupport}
						/>
					}
				/>,
			);
		}
		return routes;
	};

	return renderScene ? <Routes>{getRoutes()}</Routes> : null;
};

export default RoomRoutes;
