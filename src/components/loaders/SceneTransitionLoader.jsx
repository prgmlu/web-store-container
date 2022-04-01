import React from 'react';
import { useSelector } from 'react-redux';
import DynamicComponent from '../dynamicComponents/DynamicComponent';

const SceneTransitionLoader = () => {
	const sceneTransitionCompConfig = useSelector(
		(state) => state?.componentConfig.sceneTransition || {},
	);

	return (
		Object.keys(sceneTransitionCompConfig).length > 0 && (
			<DynamicComponent
				remoteConfig={sceneTransitionCompConfig.remoteConfig}
			/>
		)
	);
};

export default SceneTransitionLoader;
