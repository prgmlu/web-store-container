import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllScenes } from '../../apis/webStoreAPI';
import Room from '../Room';

const RoomsSwitch = ({}) => {
	const scenes = useSelector((state) => state.app.scenes);
	const dispatch = useDispatch();


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





// RoomsSwitch.propTypes = {};

export default RoomsSwitch;
