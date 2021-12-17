import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './layout.scss';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import { DynamicComponent } from 'base_components/lib';
import { getProductData } from '../../apis/webStoreAPI';
import TopUILayer from '../Loaders/TopUILayer';
import { setModalVisibility } from '../../redux_store/modalsReducer/actions';

const LoadDynamicModalComponents = () => {
	const componentConfigs = useSelector((state) => state.componentConfig);
	const dispatch = useDispatch();
	const storeData = useSelector((state) => state.storeData);

	const onHideModal = (key) => dispatch(setModalVisibility(key, false));

	const controllers = {
		getProductData: (productSku) => getProductData(storeData.id, productSku),
	};

	return (
		<>
			{Object.keys(componentConfigs)?.map((key) => {
				const currentConfig = componentConfigs[key];
				if (currentConfig.kind === 'modal') {
					const { modalConfig, remoteConfig, controllerSubscriptions } = currentConfig;
					const { selector, defaultOpen } = modalConfig;
					const modalData = useSelector((state) => state.modalData[selector]);
					const modalVisibility = useSelector((state) =>
						selector in state.modalData
							? state.modalData[selector].visible
							: defaultOpen,
					);
					const subscriptions = {};
					// eslint-disable-next-line no-return-assign
					controllerSubscriptions.forEach(
						(subKey) => (subscriptions[subKey] = controllers[subKey]),
					);
					return (
						<DynamicComponent
							remoteConfig={remoteConfig}
							modalProps={{
								show: modalVisibility,
								onHide: () => {
									onHideModal(selector);
								},
								...modalConfig,
							}}
							contentProps={{
								...modalData,
							}}
							subscriptions={subscriptions}
						/>
					);
				}
				return null;
			})}
		</>
	);
};

const Layout = ({ children }) => {
	useEffect(() => {
		// initialize materialize
	});

	const componentConfig = useSelector((state) => state.componentConfig);

	return (
		<>
			{children}
			{componentConfig?.topUILayer && <TopUILayer {...componentConfig.topUILayer} />}
			<LoadDynamicModalComponents />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any.isRequired,
};

export default Layout;
