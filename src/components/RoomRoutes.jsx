import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Room from './Room';
import {
	getAllScenes,
	getDefaultIcons,
	getStoreData,
} from '../apis/webStoreAPI';
import supportsWebP from 'supports-webp';

const RoomRoutes = () => {
	const dispatch = useDispatch();

	const storeId = useSelector((state) => state?.storeData?.id);

	const scenes = useSelector((state) => state?.scenes || {});
	const storeData = useSelector((state) => state?.storeData || {});
	const [webpSupport, setWebpSupport] = useState(true);
	const renderScene = useSelector((state) => state.sceneLoad.renderScene);

	useEffect(() => {
		supportsWebP.then((webpSupported) => setWebpSupport(webpSupported));
		dispatch(getStoreData(storeId));
		dispatch(getDefaultIcons());
		dispatch(getAllScenes(storeId));
	}, []);

	const getRoutes = () => {
		if (Object.keys(scenes).length === 0) {
			return null;
		}
		const routes = Object.keys(scenes).map((sceneId) => {
			const scene = scenes[sceneId];
			return (
				<Route
					key={scene.id}
					path={scene.name}
					element={
						<Room sceneData={scene} webpSupport={webpSupport} />
					}
				/>
			);
		});

		const firstScene = scenes[storeData.scenes[0]];
		if (firstScene) {
			routes.push(
				<Route
					key="initial"
					path="/"
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
