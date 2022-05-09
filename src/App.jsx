import React from 'react';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Store from './components/Store';
import PasswordPage from './PasswordPage';
import store from './redux_stores';
import { getStoreIdFromHtml } from './utils/htmlHelpers';

const cookies = new Cookies();
const devCookie = cookies.get('obsess-dev-cookie');

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const skipPassword =
	devCookie ||
	['61eee2727cc889e000268652', '624b14c4d6c4aea460779506', '623099e7d9db4c9fd43717e0'].includes(
		getStoreIdFromHtml(),
	);

const App = () =>
	skipPassword ? (
		<Provider store={store}>
			<Store store={store} />
		</Provider>
	) : (
		<PasswordPage />
	);

export default App;
