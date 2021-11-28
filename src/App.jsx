import React, {Component, Suspense} from 'obsess_libs/react';
import { Button } from 'obsess_libs/react-bootstrap';
import { getStoreData } from './apis/webStoreAPI';
import makeReduxStore from './redux_store';
const ToolTip = React.lazy(() => import('obsess_modules/ToolTip'));
const reduxStore = makeReduxStore();
import { Provider } from 'obsess_libs/react-redux';

export default class App extends Component{
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
                <div>
                    <h1>Open Dev Tool And Focus On Network,checkout resources details</h1>
                    <p>react、react-dom js files hosted on <strong>lib-app</strong></p>
                    <p>
                        components hosted on <strong>component-app</strong>
                    </p>
                    <h4>
                        Buttons:
                    </h4>
                    <h4>
                        Dialog:
                    </h4>
                    <Button onClick={this.handleClick}>click me to open Dialog</Button>
                    <h4>hover me please!</h4>
                    <Suspense fallback={<div/>}>
                        <ToolTip/>
                    </Suspense>

                </div>
            </Provider>
        );
    }
  }
