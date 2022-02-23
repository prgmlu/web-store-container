import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved

import { setModalVisibility } from '../../redux_stores/modalsReducer/actions';
import DynamicComponent from './DynamicComponent';

const DynamicModal = ({ config }) => {
	const dispatch = useDispatch();

	const { modalConfig, remoteConfig } = config;
	const { selector, defaultOpen, ...modalProps } = modalConfig;

	const modalData = useSelector((state) => state.modalData[selector] || {});
	modalData.storeId = useSelector((state) => state.storeData.id);
	modalData.storeStyling = useSelector(
		(state) => state.storeData.styling || {},
	);

	const modalVisibility = useSelector((state) =>
		selector in state.modalData
			? state.modalData[selector].visible
			: defaultOpen,
	);
	const subscriptions = {};

	// controllerSubscriptions.forEach(
	// 	// eslint-disable-next-line no-return-assign
	// 	(subKey) =>
	// 		(subscriptions[subKey] = useSelector(
	// 			(state) => state.shareableFunctions[subKey] || {},
	// 		)),
	// );

	const onHideModal = (key) => dispatch(setModalVisibility(key, false));

	return (
		<DynamicComponent
			remoteConfig={remoteConfig}
			modalProps={{
				show: modalVisibility,
				onHide: () => {
					onHideModal(selector);
				},
				...modalProps,
			}}
			contentProps={{
				...modalData,
			}}
			subscriptions={subscriptions}
		/>
	);
};

DynamicModal.propTypes = {
	config: PropTypes.object.isRequired,
};

export default DynamicModal;
