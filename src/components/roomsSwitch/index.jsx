import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { getAllScenes } from '../../apis/webStoreAPI';
import Room from '../Room';

const RoomsSwitch = ({ scenes }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllScenes());
	}, []);

	return (
		<Routes basename='/'>
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

const mapStateToProps = ({ app }) => ({
	scenes: app.scenes,
});

const mapDispatchToProps = {};

RoomsSwitch.propTypes = {
	scenes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSwitch);
