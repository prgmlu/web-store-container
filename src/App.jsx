import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getStoreData } from './apis/webStoreAPI';
import { makeReduxStore } from './redux_store';
import RoomsSwitch from './components/roomsSwitch';

const reduxStore = makeReduxStore();

// Keep it here, it is required for react-materialize to work

class App extends Component {
	constructor(props) {
		super(props);
		getStoreData();
	}

	render() {
		return (
			<Provider store={reduxStore}>
				<Router>
					<RoomsSwitch />
				</Router>
			</Provider>
		);
	}
}

export default App;
