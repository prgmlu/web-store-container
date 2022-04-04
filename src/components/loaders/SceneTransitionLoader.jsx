import React from 'react';
import { useSelector } from 'react-redux';
import DynamicComponent from '../dynamicComponents/DynamicComponent';

const SceneTransitionLoader = () => {
	const sceneTransitionCompConfig = useSelector(
		(state) => state?.componentConfig.sceneTransition || [],
	);

	return (
		<>
			{sceneTransitionCompConfig.map((item, ix) => {
				const { remoteConfig, ...props } = item;
				return (
					<DynamicComponent
						key={ix}
						remoteConfig={remoteConfig}
						{...props}
					/>
				);
			})}
		</>
	);
};

export default SceneTransitionLoader;
