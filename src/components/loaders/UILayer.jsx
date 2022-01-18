import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import './styles.scss';
import ModalLoader from './ModalsLoader';
import OverlayComponents from '../OverlayComponets';
import RoomRoutes from '../RoomRoutes';

const UILayer = () => (
	<Router>
		<RoomRoutes />
		<OverlayComponents />
		<ModalLoader />
	</Router>
);

export default UILayer;
