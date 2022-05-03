import React from 'react';

// eslint-disable-next-line import/no-unresolved
import './styles.scss';
import ModalLoader from './ModalsLoader';
import OverlayComponents from '../OverlayComponets';
import RoomRoutes from '../RoomRoutes';
import FontsLoader from './FontsLoader';
import PreSceneLoader from './PreSceneLoader';
import SceneOverlays from '../SceneOverlays';
import SceneTransitionLoader from './SceneTransitionLoader';

const UILayer = () => {
	return (
		<>
			<RoomRoutes />
			<SceneTransitionLoader />
			<OverlayComponents />
			<SceneOverlays />
			<PreSceneLoader />
			<ModalLoader />
			<FontsLoader />
		</>
	);
};

export default UILayer;
