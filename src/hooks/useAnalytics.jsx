import { useSelector } from 'react-redux';
import useLocalize from './useLocalize';

const useAnalytics = () => {
	const sendEventsArr = useSelector(
		(state) => state?.analytics?.sendEventsArr,
	);

	const { activeLocale } = useLocalize();

	const collect = (trackingData) => {
		const toCollect = trackingData;

		if (activeLocale) {
			toCollect.locale = activeLocale;
		}

		sendEventsArr.forEach((sendEvent) => {
			sendEvent(toCollect);
		});
	};

	return {
		collect,
	};
};

export default useAnalytics;
