import React from 'react';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Store from './components/Store';
import PasswordPage from './PasswordPage';
import store from './redux_stores';
import I18n from 'redux-i18n';

const cookies = new Cookies();
const devCookie = cookies.get('obsess-dev-cookie');

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const App = () =>
	devCookie ? (
		<Provider store={store}>
			<Store store={store} />
		</Provider>
	) : (
		<PasswordPage />
	);

export default App;
