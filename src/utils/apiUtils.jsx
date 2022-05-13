import config from 'config';
import axiosApi from '../apis/axiosApi';
import { getStoreIdFromHtml } from './htmlHelpers';

const STORE_ID = getStoreIdFromHtml();

const UrlOriginEnum = Object.freeze({
	S3: 's3',
	External: 'external',
	CDN: 'cdn',
});

const OriginUrlPrefixDict = {
	[UrlOriginEnum.S3]: 'https://s3.amazonaws.com/',
	[UrlOriginEnum.CDN]: 'https://cdn.obsess-vr.com/',
};

export function getCurrentBucket() {
	return config.S3_BUCKET;
}

export function formURL(urlObject) {
	let url = '';
	if (urlObject) {
		const { origin, path } = urlObject;
		switch (origin) {
			// case UrlOriginEnum.CDN:
			//     url = OriginUrlPrefixDict[UrlOriginEnum.CDN] + getCurrentBucket() + '/' + path;
			//     break;
			case UrlOriginEnum.S3:
			case UrlOriginEnum.CDN:
				url = `${
					OriginUrlPrefixDict[UrlOriginEnum.CDN]
				}${getCurrentBucket()}/${path}`.replace(/'/g, '%27');
				break;
			case UrlOriginEnum.External:
				url = path;
				break;
			default:
				url = path;
				break;
		}
	}
	return url;
}

export async function getPasswordConfigs() {
	try {
		const passwordConfigs = await axiosApi.get(
			`/v1/password-config?id=${STORE_ID}`,
		);
		return passwordConfigs?.data;
	} catch (err) {
		return console.error(err);
	}
}

export async function validatePassword(pw) {
	const checkPassword = window.btoa(pw);
	try {
		const res = await axiosApi.post(
			`/v1/validate-password?id=${STORE_ID}`,
			{ password: checkPassword },
		);
		return res?.data?.logged_in;
	} catch (err) {
		return console.error(err);
	}
}
