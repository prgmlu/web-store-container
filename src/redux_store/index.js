import {createStore, applyMiddleware, compose, combineReducers} from 'obsess_libs/redux';
import thunk from 'obsess_libs/redux-thunk';
import { composeWithDevTools } from 'obsess_libs/redux-devtools-extension';
import appReducer from "./appReducer"

const combinedReducers = combineReducers({
    app: appReducer
})

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(...enhancers) : compose(...enhancers);

export default function makeReduxStore(){
    return createStore(combinedReducers, undefined, composedEnhancers);
};



