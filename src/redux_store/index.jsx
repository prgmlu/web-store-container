import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './appReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const combinedReducers = combineReducers({
	app: appReducer,
});

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(...enhancers)
		: compose(...enhancers);

function makeReduxStore() {
	return createStore(combinedReducers, undefined, composedEnhancers);
}

module.exports = { makeReduxStore };
