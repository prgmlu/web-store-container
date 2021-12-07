import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getStoreData } from './apis/webStoreAPI';
import RoomsSwitch from './components/roomsSwitch';
import makeReduxStore from './redux_store';

const reduxStore = makeReduxStore();

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
