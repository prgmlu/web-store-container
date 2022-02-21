import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComponentConfig } from '../apis/webStoreAPI';
import UILayer from './loaders/UILayer';
import ModulesLayer from './loaders/ModulesLayer';
import AnalyticsLayer from './loaders/AnalyticsLayer';

const Store = () => {
	const dispatch = useDispatch();
	const storeId = useSelector((state) => state?.storeData?.id);
	dispatch(getComponentConfig(storeId));

	return (
		<>
			<UILayer />
			<ModulesLayer />
			<AnalyticsLayer />
		</>
	);
};

export default Store;
