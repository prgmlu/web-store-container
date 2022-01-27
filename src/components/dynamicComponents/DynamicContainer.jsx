import React from 'react';
import PropTypes from 'prop-types';

import DynamicComponent from './DynamicComponent';
import DynamicActionComponent from './DynamicActionComponent';

const DynamicContainer = ({ components }) => (
	<>
		{components.map((component, ix) => {
			if (component.kind === 'container') {
				return (
					<div style={component.containerStyling} key={ix}>
						<DynamicContainer components={component.components} />
					</div>
				);
			}

			if (component.kind === 'action_component') {
				return <DynamicActionComponent key={ix} {...component} />;
			}

			if (component.kind === 'component') {
				const { remoteConfig, ...passThroughProps } = component;
				return (
					<DynamicComponent
						remoteConfig={component.remoteConfig}
						{...passThroughProps}
						key={ix}
					/>
				);
			}
			return null;
		})}
	</>
);

DynamicContainer.propTypes = {
	components: PropTypes.array,
};

DynamicContainer.defaultProps = {
	components: [],
};

export default DynamicContainer;
