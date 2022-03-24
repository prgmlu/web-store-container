import { useSelector } from 'react-redux';
import React from 'react';
import DynamicContainer from './dynamicComponents/DynamicContainer';
import PreSceneLoader from './loaders/PreSceneLoader';

const OverlayComponents = () => {
	const overlayComponents = useSelector(
		(state) => state?.componentConfig?.overlayComponents || {},
	);

	const renderScene = useSelector((state) => state.sceneLoad.renderScene);
	const { components } = overlayComponents;

	return (
		<div className="overlayComponents">
			{renderScene && <DynamicContainer components={components} />}
			<PreSceneLoader />
		</div>
	);
};

export default OverlayComponents;
