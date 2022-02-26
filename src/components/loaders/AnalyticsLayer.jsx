import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import config from 'config';
import WebpackUtils from '../../utils/WebpackUtils';
import { setSendEventsArr } from '../../redux_stores/analyticsReducer/actions';
import { registerShareable } from '../../redux_stores/functionsReducer/actions';

const AnalyticsLayer = () => {
	const storeName = useSelector((state) => state?.storeData?.name);
	const analyticsModules = useSelector(
		(state) => state?.componentConfig?.analyticsModules || [],
	);

	const locale = undefined; // update with localization

	const dispatch = useDispatch();
	const location = useLocation();
	const { pathname } = location;

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

	const sendEventsArr = useSelector(
		(state) => state?.analytics?.sendEventsArr,
	);

	useEffect(() => {
		const sendEventWrappedFunction = (trackingData) =>
			sendEventsArr.forEach((sendEvent) => {
				sendEvent(trackingData);
			});
		if (sendEventsArr.length > 0) {
			dispatch(
				registerShareable({
					sendAnalyticsEvent: sendEventWrappedFunction,
				}),
			);
		}
	}, [sendEventsArr]);

	const sendAnalyticsEvent = useSelector(
		(state) => state?.shareableFunctions?.sendAnalyticsEvent,
	);

	useEffect(() => {
		if (sendAnalyticsEvent) {
			const sceneName = pathname.split('/').pop();
			sendAnalyticsEvent({
				sceneName,
				locale,
				pageView: true,
			});
		}
	}, [pathname]);

	return null;
};

export default AnalyticsLayer;
