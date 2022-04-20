export function getFilename(src = '') {
	let fileName = '';
	if (src) {
		const file = src.split('/').pop();
		fileName = file
			.slice(0, file.lastIndexOf('.'))
			.replace(/[^a-zA-Z]/g, ' ');
	}
	return fileName;
}
