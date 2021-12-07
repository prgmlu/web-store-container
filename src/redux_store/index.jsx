import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**  Reducers **/
import appReducer from './appReducer';

console.log('=> apreducer', appReducer);
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

export default function makeReduxStore() {
	return createStore(combinedReducers, undefined, composedEnhancers);
}
