export const getLocalizedPath = (localeCode, sceneName) => {
	let prefix = '';
	if (localeCode) {
		prefix = `/${localeCode}`;
	}
	return `${prefix}/${sceneName}`;
};

const formatDate = (date, format) => {
	const map = {
		mm: date.getMonth() + 1,
		dd: date.getDate(),
		yy: date.getFullYear().toString().slice(-2),
		hh: date.getHours().toString(),
		yyyy: date.getFullYear(),
	};

	return format.replace(/mm|dd|hh|yy|yyy/gi, (matched) => map[matched]);
};

export const getBustKey = (sceneJson) => {
	if (sceneJson?.image_integrity) {
		return sceneJson.image_integrity.replace(/\D/g, '');
	}
	return formatDate(new Date(), 'hhmmddyyyy');
};
