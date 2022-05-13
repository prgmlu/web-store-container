import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Store from './components/Store';
import PasswordPage from './PasswordPage';
import store from './redux_stores';
import { formURL, getPasswordConfigs } from './utils/apiUtils';

const cookies = new Cookies();
const skipPasswordCheck = cookies.get('obsess-dev-cookie');
let passwordButtonCopy;
let passwordPageBackground;

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const App = () => {
	const [passwordEnabled, setPasswordEnabled] = useState(undefined);

	const checkPassword = async () => {
		const {
			password_enabled: enabled,
			background_image: image,
			submit_button_copy: text,
		} = await getPasswordConfigs();

		if (!enabled || skipPasswordCheck) {
			setPasswordEnabled(false);
			return;
		}
		passwordButtonCopy = text;
		passwordPageBackground = image && formURL(image);
		setPasswordEnabled(true);
	};

	const renderStore = () => {
		if (passwordEnabled === undefined) {
			return null;
		}
		if (passwordEnabled) {
			return (
				<PasswordPage
					setPasswordEnabled={setPasswordEnabled}
					passwordButtonCopy={passwordButtonCopy}
					passwordPageBackground={passwordPageBackground}
				/>
			);
		}
		return (
			<Provider store={store}>
				<Store store={store} />
			</Provider>
		);
	};

	useEffect(() => {
		checkPassword();
	}, []);

	return renderStore();
};

export default App;
