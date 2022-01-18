import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import makeReduxStore from './redux_stores';
import UILayer from './components/loaders/UILayer';
import { getComponentConfig } from './apis/webStoreAPI';
import ModulesLayer from './components/loaders/ModulesLayer';

const reduxStore = makeReduxStore();

const Store = () => {
	const dispatch = useDispatch();
	const storeId = useSelector((state) => state.storeData.id);
	dispatch(getComponentConfig(storeId));

	return (
		<>
			<UILayer />
			<ModulesLayer />
		</>
	);
};

const App = () => (
	<Provider store={reduxStore}>
		<Store />
	</Provider>
);

export default App;
