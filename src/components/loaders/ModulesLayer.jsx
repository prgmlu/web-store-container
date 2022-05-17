import React from 'react';
import { useSelector } from 'react-redux';
import DynamicComponent from '../dynamicComponents/DynamicComponent';

const ModulesLayer = () => {
	const modules = useSelector(
		(state) => state?.componentConfig?.modules || {},
	);

	return (
		<>
			{Object.keys(modules).map((item) => {
				const { remoteConfig, ...props } = modules[item];
				return (
					<DynamicComponent
						key={item}
						remoteConfig={modules[item].remoteConfig}
						{...props}
					/>
				);
			})}
		</>
	);
};

export default ModulesLayer;
