import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import WebpackUtils from '../../utils/WebpackUtils';

const DynamicComponent = (props) => {
	const { remoteConfig, fallBackComponent, ...passThrough } = props;

	const LoadedComponent = WebpackUtils.withDynamicScript(
		remoteConfig,
		fallBackComponent,
	);
	useEffect(() => {}, [passThrough]);

	return (
		<React.Suspense fallback={fallBackComponent}>
			<LoadedComponent {...passThrough} />
		</React.Suspense>
	);
};

DynamicComponent.propTypes = {
	remoteConfig: PropTypes.object.isRequired,
	fallBackComponent: PropTypes.object,
};

DynamicComponent.defaultProps = {
	fallBackComponent: <div />,
};

export default DynamicComponent;
