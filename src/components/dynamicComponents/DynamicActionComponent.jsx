import React from 'react';
import { useDispatch } from 'react-redux';
import DynamicComponent from './DynamicComponent';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';

const DynamicActionComponent = ({
	remoteConfig,
	actionType,
	actionProps,
	...props
}) => {
	const dispatch = useDispatch();

	const actions = {
		redirectUrl: ({ link }) => window.open(link, '_blank'),
		triggerModal: ({ selector }) =>
			dispatch(setModalProps(selector, { visible: true })),
	};

	return (
		<DynamicComponent
			remoteConfig={remoteConfig}
			{...props}
			onClick={() => actions[actionType](actionProps)}
		/>
	);
};

export default DynamicActionComponent;
