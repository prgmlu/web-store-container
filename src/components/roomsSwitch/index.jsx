import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { connect, useDispatch } from 'react-redux';

import { getAllScenes } from '../../apis/webStoreAPI';
import Room from '../Room';

const RoomsSwitch = function ({ scenes }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllScenes());
	}, []);

	const getSomeRandomData = () => ({});

	return (
		<Routes basename='/'>
			{Object.keys(scenes).map((sceneId) => {
				const scene = scenes[sceneId];
				return (
					<Route
						key={scene.id}
						path={scene.name === 'entrance' ? '/' : scene.name}
						element={<Room sceneData={scene} sceneId={scene.id} />}
					/>
				);
			})}
		</Routes>
	);
};

const mapStateToProps = ({ app }) => ({
	scenes: app.scenes,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSwitch);
