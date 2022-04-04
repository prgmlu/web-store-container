// // const fs = require('fs');
// import fs from 'fs';
// import fetch from 'node-fetch';
// import path from 'path';
//
// console.log('=> fetch', fetch);
// const getComponentConfig = () => {
// 	return new Promise((resolve, reject) => {
// 		fetch(
// 			'https://api.beta.obsess-vr.com/webstore/v1/store/product/?store_id=5f176763135089517fd8a1c6&product_id=290840886001&locale=en_US',
// 		)
// 			.then((response) => response.json())
// 			.then((result) => resolve(result));
// 	});
// };
//
// const writeToFile = (data) => {
// 	fs.writeFile(
// 		`${path.resolve(__dirname, '..')}/configs/components.json`,
// 		JSON.stringify(data),
// 		() => {
// 			console.log('Ready');
// 		},
// 	);
// };
//
// const prepare = () => {
// 	getComponentConfig().then((result) => writeToFile(result));
// };
//
// prepare();
