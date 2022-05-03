import fs from 'fs';

import fetch from 'node-fetch';
import path, { dirname } from 'path';

import * as store from '../configs/config.store.json' assert { type: 'json' };
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getComponentConfig = () => {
	return new Promise((resolve, reject) => {
		const configUrl = `https://api.beta.obsess-vr.com/webstore/v1/component_config?storeId=${store.default.STORE_ID}`;
		fetch(configUrl)
			.then((response) => response.json())
			.then((result) => resolve(result));
	});
};

const writeToFile = (data) => {
	fs.writeFile(
		`${path.resolve(__dirname, '..')}/configs/components.json`,
		JSON.stringify(data),
		() => {
			console.log('\n\nReady - Run `npm start` to begin development');
		},
	);
};

const prepare = () => {
	getComponentConfig().then((result) => writeToFile(result));
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	prepare();
}
