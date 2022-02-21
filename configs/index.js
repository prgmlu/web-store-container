const devConfig = require('./config.development.json');
const betaConfig = require('./config.beta.json');
const prodConfig = require('./config.production.json');

function loadConfig(env) {
	if (env === 'production') {
		return devConfig;
	}
	if (env === 'beta') {
		return devConfig;
	}
	return devConfig;
}

module.exports = { loadConfig };
