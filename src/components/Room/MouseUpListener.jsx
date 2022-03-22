import React from 'react';
import { formURL } from '../../utils/apiUtils';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MouseUpListener = ({ e, sceneObject, marker, isDragEvent }) => {
	const sendAnalyticsEvent = useSelector(
		(state) => state.shareableFunctions.sendAnalyticsEvent,
	);
	const navigate = useNavigate();
	const scenes = useSelector((state) => state.scenes);

	const onNavMarkerClicked = (data) => {
		// setRoomObjects([]);
		navigate(`/${scenes[data.linked_room_id.$oid].name}`);
		sendAnalyticsEvent({
			eventCategory: 'Navigation',
			eventAction: 'Arrow clicked',
			eventLabel: scenes[sceneData.id].name,
		});
	};

	const onLinkMarkerClicked = (data) => {
		const linkUrl = formURL(data.url);
		window.open(linkUrl, '_blank');

		sendAnalyticsEvent({
			eventCategory: 'Content',
			eventAction: 'Link',
			eventLabel: linkUrl,
		});
	};

	const onSoundMarkerClicked = (data) => {
		// this needs work
		const audioFile = formURL(data.url);
		// const audio = new Audio(audioFile);
		// audio.play();

		sendAnalyticsEvent({
			eventCategory: 'Content',
			eventAction: 'Sound',
			eventLabel: audioFile,
		});
	};

	const onHotspotMarkerClicked = (data) => {
		switch (data.hotspot_type) {
			case 'link':
				onLinkMarkerClicked(data);
				break;
			case 'sound':
				onSoundMarkerClicked(data);
				break;
			case 'custom':
				dispatch(
					setModalProps(data.selector, { ...data, visible: true }),
				);
				break;
			default:
				dispatch(
					setModalProps(data.hotspot_type, {
						...data,
						visible: true,
					}),
				);
		}
	};

	if (marker) {
		const { type, props } = marker.userData;
		if (type === 'NavMarker') {
			onNavMarkerClicked(props);
		} else if (type === 'HotspotMarker') {
			onHotspotMarkerClicked(props);
		}
	}

	return null;
};
