import React from 'react';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import makeReduxStore from './redux_stores';
import Store from './components/Store';
import PasswordPage from './PasswordPage';

const cookies = new Cookies();
const devCookie = cookies.get('obsess-dev-cookie');
console.log('=>', devCookie);
const App = () =>
	devCookie ? (
		<Provider store={makeReduxStore()}>
			<Store />
		</Provider>
	) : (
		<PasswordPage />
	);

export default App;
