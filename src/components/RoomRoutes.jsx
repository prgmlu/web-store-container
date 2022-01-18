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

	return (
		<Routes>
			{Object.keys(scenes).map((sceneId) => {
				const scene = scenes[sceneId];
				return (
					<Route
						key={scene.id}
						path={
							sceneId === storeData?.scenes[0] ? '/' : scene.name
						}
						element={<Room sceneData={scene} />}
					/>
				);
			})}
		</Routes>
	);
};

export default RoomRoutes;
