import React from 'react';

// eslint-disable-next-line import/no-unresolved
import './styles.scss';
import ModalLoader from './ModalsLoader';
import OverlayComponents from '../OverlayComponets';
import RoomRoutes from '../RoomRoutes';
import FontsLoader from './FontsLoader';
import DynamicComponent from '../dynamicComponents/DynamicComponent';
import { useDispatch, useSelector } from 'react-redux';

const UILayer = () => {
	console.log('=> UILayer');

	return (
		<>
			<RoomRoutes />
			<OverlayComponents />
			<ModalLoader />
			<FontsLoader />
		</>
	);
};

export default UILayer;
