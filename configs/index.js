const devConfig = require('./config.development.json');
const betaConfig = require('./config.beta.json');
const prodConfig = require('./config.production.json');
const clientConfig = require('./config.client.json');
const storeConfig = require('./config.store.json');

function loadConfig(env) {
	let config = devConfig;
	if (env === 'client') {
		config = clientConfig;
	}
	if (env === 'production') {
		config = prodConfig;
	} else if (env === 'beta') {
		config = betaConfig;
	}
	return { ...config, ...storeConfig };
}

module.exports = { loadConfig };
