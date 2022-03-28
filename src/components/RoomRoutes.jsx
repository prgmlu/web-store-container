import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import supportsWebP from 'supports-webp';
import config from 'config';
import { withLocalize } from 'react-localize-redux';
import Room from './Room';

const RoomRoutes = ({ activeLanguage, languages }) => {
	const scenes = useSelector((state) => state?.scenes || {});
	const storeDataScenes = useSelector(
		(state) => state?.storeData.scenes || [],
	);
	const [webpSupport, setWebpSupport] = useState(true);
	const renderScene = useSelector((state) => state.sceneLoad.renderScene);
	const showClientLinkLocale = useSelector(
		(state) => state.storeData?.client_link_config?.show === true,
	);
	const navigate = useNavigate();

	useEffect(() => {
		supportsWebP.then((webpSupported) => setWebpSupport(webpSupported));
	}, []);

	const activeLangCode = activeLanguage?.code || false;

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
			return;
		}

		// Case: #/
		const hashPath = window.location.hash;

		if (hashPath === '#/' || hashPath === '') {
			return `/${activeLangCode}`;
		}

		// Case: #/localeCode/anyString
		const availableLangs = languages.map((item) => item.code);
		const hashPathParts = hashPath.split('/');
		if (availableLangs.includes(hashPathParts[1])) {
			return null;
		}

		// Case: #/anyString
		return hashPath.replace('#', `/${activeLangCode}`);
	};

	const getLocalizedPath = (sceneName) => {
		const localeCode = activeLanguage?.code;

		if (shouldShowLocale() && localeCode && localeCode !== '') {
			return `${localeCode}/${sceneName}`;
		}
		return sceneName;
	};

	useEffect(() => {
		if (activeLangCode) {
			const defaultRedirect = getDefaultRedirect();
			if (defaultRedirect) {
				navigate(defaultRedirect);
			}
		}
	}, [activeLangCode]);

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

export default withLocalize(RoomRoutes);
