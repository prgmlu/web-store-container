import React from 'react';
import { Provider } from 'react-redux';
import makeReduxStore from './redux_stores';
import Store from './components/Store';

const reduxStore = makeReduxStore();

const App = () => (
	<Provider store={reduxStore}>
		<Store />
	</Provider>
);

export default App;
