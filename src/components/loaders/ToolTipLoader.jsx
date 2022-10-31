import React from 'react';
import WebpackUtils from '../../utils/WebpackUtils';
import { useStore } from 'react-redux';

const ToolTipLoader = (config) => {
	const templates = {};
	const store = useStore();

	config.forEach((template) => {
		const fallBackComponent = <div style={template.properties}></div>;
		const LoadedComponent = WebpackUtils.withDynamicScript(
			template.remoteConfig,
			fallBackComponent,
		);
		const Wrapped = (passedProps) => (
			<React.Suspense fallback={fallBackComponent}>
				<LoadedComponent
					{...template.properties}
					{...passedProps}
					store={store}
				/>
			</React.Suspense>
		);
		templates[template.selector] = <Wrapped />;
	});

	return templates;
};

export default ToolTipLoader;
