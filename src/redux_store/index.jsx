import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**  Reducers * */
import scenesReducer from './scenesReducer';
import storeDataReducer from './storeDataReducer/actions';

const combinedReducers = combineReducers({
	scenes: scenesReducer,
	storeData: storeDataReducer,
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
