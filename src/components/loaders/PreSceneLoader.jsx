import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicComponent from '../dynamicComponents/DynamicComponent';
import {
	setPreScreenVisibility,
	setSceneVisibility,
} from '../../redux_stores/sceneLoadReducer/actions';

const PreScene = () => {
	const preSceneComponent = useSelector(
		(state) => state?.componentConfig?.preSceneComponent || null,
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (preSceneComponent === null) {
			dispatch(setPreScreenVisibility(false));
			dispatch(setSceneVisibility(true));
		}
	}, [preSceneComponent]);

	return preSceneComponent ? (
		<DynamicComponent remoteConfig={preSceneComponent.remoteConfig} />
	) : null;
};

const PreSceneLoader = () => {
	const preScreenVisible = useSelector(
		(state) => state.sceneLoad.preScreenVisible,
	);
	return preScreenVisible ? <PreScene /> : null;
};

export default PreSceneLoader;
