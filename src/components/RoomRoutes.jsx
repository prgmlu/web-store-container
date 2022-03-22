import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import supportsWebP from 'supports-webp';

import Room from './Room';
import { getAllScenes } from '../apis/webStoreAPI';

const RoomRoutes = () => {
	const dispatch = useDispatch();

	const storeId = useSelector((state) => state?.storeData?.id);

	const scenes = useSelector((state) => state?.scenes || {});
	const storeData = useSelector((state) => state?.storeData || {});
	const [webpSupport, setWebpSupport] = useState(true);

	console.log(
		'=> RoomRoutes',
		Object.keys(scenes).length,
		Object.keys(storeData).length,
	);

	useEffect(() => {
		supportsWebP.then((webpSupported) => setWebpSupport(webpSupported));
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

	return <Routes>{getRoutes()}</Routes>;
};

export default RoomRoutes;
