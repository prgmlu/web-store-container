import { useSelector } from 'react-redux';
import React from 'react';
import DynamicContainer from './dynamicComponents/DynamicContainer';

const OverlayComponents = () => {
	const overlayComponents = useSelector(
		(state) => state?.componentConfig?.overlayComponents || {},
	);

	const { components } = overlayComponents;

	return (
		<div className="overlayComponents">
			<DynamicContainer components={components} />
		</div>
	);
};

export default OverlayComponents;
