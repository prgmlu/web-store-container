import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RoomsSwitch from './components/roomsSwitch';
import makeReduxStore from './redux_store';

const reduxStore = makeReduxStore();

const App = () => (
	<Provider store={reduxStore}>
		<Router>
			<RoomsSwitch />
		</Router>
	</Provider>
);

export default App;
