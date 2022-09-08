import React from 'react';
import { useSelector } from 'react-redux';
import DynamicModal from '../dynamicComponents/DynamicModal';

const ModalLoader = () => {
	const modals = useSelector((state) => state?.componentConfig?.modals || []);
	const renderScene = useSelector((state) => state.sceneLoad.renderScene);
	const renderUI = useSelector((state) => state.sceneLoad.renderUI);

	return (
		renderScene &&
		renderUI &&
		modals.map((modalConfig, ix) => (
			<DynamicModal key={ix} config={modalConfig} />
		))
	);
};

export default ModalLoader;
