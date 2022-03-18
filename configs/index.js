const devConfig = require('./config.development.json');
const betaConfig = require('./config.beta.json');
const prodConfig = require('./config.production.json');
const storeConfig = require('./config.store.json');

function loadConfig(env) {
	if (env === 'production') {
		return { ...prodConfig, ...storeConfig };
	}
	if (env === 'beta') {
		return { ...betaConfig, ...storeConfig };
	}
	return { ...devConfig, ...storeConfig };
}

module.exports = { loadConfig };
