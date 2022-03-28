export const getLocalizedPath = (localeCode, sceneName) => {
	let prefix = '';
	if (localeCode) {
		prefix = `/${localeCode}`;
	}
	return `${prefix}/${sceneName}`;
};
