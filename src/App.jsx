import React, {Component} from 'obsess_libs/react';
import { getStoreData } from './apis/webStoreAPI';
import makeReduxStore from './redux_store';
const reduxStore = makeReduxStore();
import { Provider } from 'obsess_libs/react-redux';
import RoomsSwitch from './components/roomsSwitch';
import {
    BrowserRouter as Router,
} from "obsess_libs/react-router-dom";

class App extends Component{
    constructor(props) {
      super(props)
      this.state = {
        dialogVisible:false
      }
      this.handleClick = this.handleClick.bind(this);
      this.HanldeSwitchVisible = this.HanldeSwitchVisible.bind(this);
        getStoreData()
    }

    handleClick(ev){
      console.log(ev);
      this.setState({
        dialogVisible:true
      })
    }

    HanldeSwitchVisible(visible){
      this.setState({
        dialogVisible:visible
      })
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
