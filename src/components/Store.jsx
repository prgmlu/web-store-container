import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { getComponentConfig, getStoreData } from '../apis/webStoreAPI';
import UILayer from './loaders/UILayer';
import ModulesLayer from './loaders/ModulesLayer';
import AnalyticsLayer from './loaders/AnalyticsLayer';

const Store = () => {
	const dispatch = useDispatch();
	const storeId = useSelector((state) => state?.storeData?.id);
	dispatch(getComponentConfig(storeId));
	dispatch(getStoreData(storeId));

	return (
		<Router>
			<UILayer />
			<ModulesLayer />
			<AnalyticsLayer />
		</Router>
	);
};

export default Store;
