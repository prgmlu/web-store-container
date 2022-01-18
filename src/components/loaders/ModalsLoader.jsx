import React from 'react';
import { useSelector } from 'react-redux';
import DynamicModal from '../dynamicComponents/DynamicModal';

const ModalLoader = () => {
	const modals = useSelector((state) => state.componentConfig.modals);

	return Object.keys(modals)?.map((key) => {
		const currentConfig = modals[key];
		if (currentConfig.kind === 'modal') {
			return <DynamicModal key={key} config={currentConfig} />;
		}
		return null;
	});
};

export default ModalLoader;
