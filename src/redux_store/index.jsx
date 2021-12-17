import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**  Reducers * */
import scenesReducer from './scenesReducer';
import storeDataReducer from './storeDataReducer/actions';
import modalReducer from './modalsReducer';
import componentConfigReducer from './componentConfigReducer';

const combinedReducers = combineReducers({
	scenes: scenesReducer,
	storeData: storeDataReducer,
	modalData: modalReducer,
	componentConfig: componentConfigReducer,
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
