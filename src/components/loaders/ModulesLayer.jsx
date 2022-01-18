import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { WebpackUtils } from 'base_components/lib';
import { registerShareable } from '../../redux_stores/functionsReducer/actions';

const ModulesLayer = () => {
	const modules = useSelector((state) => state.componentConfig.modules || {});
	const dispatch = useDispatch();

	const onScriptLoaded = (scope, module) => {
		WebpackUtils.loadComponent(scope, module).then((factory) =>
			dispatch(registerShareable(factory.default)),
		);
	};

	useEffect(() => {
		Object.keys(modules).forEach((item) => {
			const remoteModule = modules[item];
			const { url, scope, module } = remoteModule.remoteConfig;
			const element = WebpackUtils.createElement(url, () =>
				onScriptLoaded(scope, module),
			);
			document.head.appendChild(element);
		});
	}, [modules]);

	return null;
};

export default ModulesLayer;
