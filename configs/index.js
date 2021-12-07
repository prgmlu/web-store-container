const devConfig = require('./config.development.json');

function loadConfig(env) {
	if (env === 'production') {
		return devConfig;
	} if (env === 'beta') {
		return devConfig;
	}
	return devConfig;
}

module.exports = { loadConfig };
