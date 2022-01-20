import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formURL } from '../../utils/apiUtils';

const FontsLoader = () => {
	const fonts = useSelector(
		(state) => state?.storeData?.styling?.font_files || {},
	);

	useEffect(() => {
		const fontStyleNode = document.createElement('style');
		let fontFaceString = '';

		Object.keys(fonts).forEach((fontKey) => {
			const font = fonts[fontKey];
			fontFaceString += `@font-face {font-family: ${fontKey}; font-display: swap; src: url("${formURL(
				font.url,
			)}"); }`;

			const fontPreloader = document.createElement('span');
			fontPreloader.style.fontFamily = fontKey;
			fontPreloader.style.width = 0;
			fontPreloader.style.height = 0;
			fontPreloader.style.zIndex = -999;
			document.body.appendChild(fontPreloader);
		});

		fontStyleNode.textContent = fontFaceString;
		document.head.appendChild(fontStyleNode);
	}, [fonts]);

	return null;
};

export default FontsLoader;
