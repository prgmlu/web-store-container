import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { DynamicContainer } from 'base_components/lib';
import PropTypes from 'prop-types';
import './styles.scss';

const TopUILayer = ({ remoteConfig, components, ...passThroughProps }) => {
	return (
		<div className="topUILayer">
			<DynamicContainer components={components} />
		</div>
	);
};

TopUILayer.propTypes = {
	remoteConfig: PropTypes.object,
};

export default TopUILayer;
