export const getStoreIdFromHtml = () =>
	document.getElementById('storeId').getAttribute('value');

export const getLocaleFromHtml = () =>
	document.getElementById('locale')?.getAttribute('value');
