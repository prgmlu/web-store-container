import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Room from './Room';
import { getAllScenes, getStoreData } from '../apis/webStoreAPI';

const RoomRoutes = () => {
	const dispatch = useDispatch();

	const storeId = useSelector((state) => state.storeData.id);

	const scenes = useSelector((state) => state.scenes);
	const storeData = useSelector((state) => state.storeData);

	useEffect(() => {
		if (storeId) {
			dispatch(getStoreData(storeId));
			dispatch(getAllScenes(storeId));
		}
	}, [storeId]);

	const getRoutes = () => {
		const routes = Object.keys(scenes).map((sceneId) => {
			const scene = scenes[sceneId];
			return (
				<Route
					key={scene.id}
					path={scene.name}
					element={<Room sceneData={scene} />}
				/>
			);
		});

		const firstScene = scenes[storeData.scenes[0]];
		if (firstScene) {
			routes.push(
				<Route
					key="root"
					path="/"
					element={<Room sceneData={firstScene} />}
				/>,
			);
		}
		return routes;
	};

	return <Routes>{getRoutes()}</Routes>;
};

export default RoomRoutes;
