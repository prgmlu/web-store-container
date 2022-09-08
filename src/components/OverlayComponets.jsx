import { useSelector } from 'react-redux';
import React from 'react';
import DynamicContainer from './dynamicComponents/DynamicContainer';

const OverlayComponents = () => {
	const overlayComponents = useSelector(
		(state) => state?.componentConfig?.overlayComponents || {},
	);

	const renderScene = useSelector((state) => state.sceneLoad.renderScene);
	const renderUI = useSelector((state) => state.sceneLoad.renderUI);

	const { components } = overlayComponents;

	return (
		<div className="overlayComponents">
			{renderScene && renderUI && (
				<DynamicContainer components={components} />
			)}
		</div>
	);
};

export default OverlayComponents;
