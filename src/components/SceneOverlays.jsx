import { useSelector } from 'react-redux';
import React from 'react';
import DynamicContainer from './dynamicComponents/DynamicContainer';

const SceneOverlays = () => {
	const { renderScene, activeScene } = useSelector(
		(state) => state.sceneLoad,
	);

	const sceneOverlay = useSelector(
		(state) => state?.componentConfig?.sceneOverlays?.[activeScene],
	);

	if (sceneOverlay === undefined || Object.keys(sceneOverlay).length === 0) {
		return null;
	}

	const { components } = sceneOverlay;

	return (
		renderScene &&
		components &&
		components.length > 0 && (
			<div className="sceneOverlays">
				<DynamicContainer components={components} />
			</div>
		)
	);
};

export default SceneOverlays;
