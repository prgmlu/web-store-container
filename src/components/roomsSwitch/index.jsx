import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScenes, getStoreData } from '../../apis/webStoreAPI';
import Room from '../Room';

const RoomsSwitch = () => {
	const scenes = useSelector((state) => state.scenes);
	const storeData = useSelector((state) => state.storeData);
	const dispatch = useDispatch();

	if (!storeData || Object.keys(storeData).length === 0) dispatch(getStoreData());

	useEffect(() => {
		dispatch(getAllScenes());
	}, []);

	return (
		<Routes basename="/">
			{Object.keys(scenes).map((sceneId) => {
				const scene = scenes[sceneId];
				return (
					<Route
						key={scene.id}
						path={scene.name === 'entrance' ? '/' : scene.name}
						element={<Room sceneData={scene} />}
					/>
				);
			})}
		</Routes>
	);
};

export default RoomsSwitch;
