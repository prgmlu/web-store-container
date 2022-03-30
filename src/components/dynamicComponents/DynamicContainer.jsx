import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import DynamicComponent from './DynamicComponent';
import DynamicActionComponent from './DynamicActionComponent';

const DynamicContainer = ({ components }) => {
	const selectContainerStyling = (component) => {
		if (
			'containerStylingMobile' in component &&
			Object.keys(component.containerStylingMobile).length > 0 &&
			isMobile
		) {
			return component.containerStylingMobile;
		}
		return component.containerStyling;
	};

	return (
		<>
			{components.map((component, ix) => {
				if (component.kind === 'container') {
					return (
						<div style={selectContainerStyling(component)} key={ix}>
							<DynamicContainer
								components={component.components}
							/>
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
};

DynamicContainer.propTypes = {
	components: PropTypes.array,
};

DynamicContainer.defaultProps = {
	components: [],
};

export default DynamicContainer;
