import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from 'config';
import WebpackUtils from '../../utils/WebpackUtils';
import { setSendEventsArr } from '../../redux_stores/analyticsReducer/actions';

const AnalyticsLayer = ({ locale }) => {
	const storeName = useSelector((state) => state?.storeData?.name);
	const analyticsModules = useSelector(
		(state) => state?.componentConfig?.analyticsModules || [],
	);

	const dispatch = useDispatch();

	const loadModuleScript = (scope, module, analyticsData) => {
		WebpackUtils.loadComponent(scope, module).then((factory) => {
			const { load, sendEvent } = factory.default;
			load(config.ENV, storeName, analyticsData, locale);
			dispatch(setSendEventsArr(sendEvent));
		});
	};

	useEffect(() => {
		if (storeName) {
			analyticsModules.forEach((analyticsModule) => {
				const { url, scope, module } = analyticsModule.remoteConfig;

				const analyticsData = {
					betaAnalyticsID: analyticsModule.betaAnalyticsID,
					prodAnalyticsID: analyticsModule.prodAnalyticsID,
					additionalAnalyticsIDs:
						analyticsModule.additionalAnalyticsIDs,
				};

				const element = WebpackUtils.createElement(url, () =>
					loadModuleScript(scope, module, analyticsData),
				);
				document.head.appendChild(element);
			});
		}
	}, [storeName]);

	return null;
};

export default AnalyticsLayer;
