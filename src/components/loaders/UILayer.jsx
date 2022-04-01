import React from 'react';

// eslint-disable-next-line import/no-unresolved
import './styles.scss';
import ModalLoader from './ModalsLoader';
import OverlayComponents from '../OverlayComponets';
import RoomRoutes from '../RoomRoutes';
import FontsLoader from './FontsLoader';
import PreSceneLoader from './PreSceneLoader';
import SceneTransitionLoader from './SceneTransitionLoader';

const UILayer = () => (
	<>
		<RoomRoutes />
		<SceneTransitionLoader />
		<OverlayComponents />
		<PreSceneLoader />
		<ModalLoader />
		<FontsLoader />
	</>
);

export default UILayer;
