import React, {Component} from 'obsess_libs/react';
import { getStoreData } from './apis/webStoreAPI';
import makeReduxStore from './redux_store';
const reduxStore = makeReduxStore();
import { Provider } from 'obsess_libs/react-redux';
import RoomsSwitch from './components/roomsSwitch';
import {
    BrowserRouter as Router,
} from "obsess_libs/react-router-dom";
// Keep it here, it is required for react-materialize to work

class App extends Component{
    constructor(props) {
        super(props)
        getStoreData();
    }

    render(){

        return (
            <Provider store={reduxStore}>
                <Router>
                    <RoomsSwitch/>
                </Router>
            </Provider>
        );
    }
  }

export default App;
