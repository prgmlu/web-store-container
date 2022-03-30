import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicComponent from '../dynamicComponents/DynamicComponent';
import {
	setPreScreenVisibility,
	setSceneVisibility,
} from '../../redux_stores/sceneLoadReducer/actions';

const PreScene = () => {
	const dispatch = useDispatch();
	const preSceneComponent = useSelector(
		(state) => state?.componentConfig?.preSceneComponent || {},
	);

	const componentNotNull = () =>
		preSceneComponent !== null &&
		Object.keys(preSceneComponent).length !== 0;

	useEffect(() => {
		if (!componentNotNull()) {
			dispatch(setPreScreenVisibility(false));
			dispatch(setSceneVisibility(true));
		}
	}, [preSceneComponent]);

	return (
		componentNotNull() && (
			<DynamicComponent remoteConfig={preSceneComponent.remoteConfig} />
		)
	);
};

const PreSceneLoader = () => {
	const preScreenVisible = useSelector(
		(state) => state.sceneLoad.preScreenVisible,
	);
	return preScreenVisible ? <PreScene /> : null;
};

export default PreSceneLoader;
