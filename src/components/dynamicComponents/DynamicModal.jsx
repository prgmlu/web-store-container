import React from 'react';
import PropTypes from 'prop-types';

import DynamicComponent from './DynamicComponent';

const DynamicModal = ({ config }) => {
	const { modalConfig, remoteConfig } = config;

	return (
		<DynamicComponent
			remoteConfig={remoteConfig}
			modalConfig={{
				...modalConfig,
				dialogClassName: 'modal-dialog-override',
			}}
		/>
	);
};

DynamicModal.propTypes = {
	config: PropTypes.object.isRequired,
};

export default DynamicModal;
