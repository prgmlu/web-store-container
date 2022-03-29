import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene from 'threejs_scene/Scene';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import './room.scss';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';
import {
	setNavMarkerCount,
	resetCurrentAccessibilityNavIdx,
} from '../../redux_stores/accessibilityReducer/actions';
import RoomObjects from './RoomObjects';
import useLocalize from '../../hooks/useLocalize';
import useLocalizedNavigation from '../../hooks/useLocalizedNavigation';

const Room = ({ sceneData, webpSupport }) => {
	const [roomObjects, setRoomObjects] = useState([]);
	const [linkedScenes, setLinkedScenes] = useState([]);
	const scenes = useSelector((state) => state.scenes);
	const { navigate } = useLocalizedNavigation();
	const dispatch = useDispatch();
	const sendAnalyticsEvent = useSelector(
		(state) => state.shareableFunctions.sendAnalyticsEvent,
	);
	const allReduxStoreData = useSelector((data) => data);
	const { activeLocale } = useLocalize();

	useEffect(() => {
		getSceneObjects(sceneData.id, activeLocale)
			.then((res) => {
				setRoomObjects(res);
				setLinkedScenes(
					res
						.filter((item) => item.type === 'NavMarker')
						.map((item) => scenes[item?.props?.linked_room_id.$oid])
						.filter((item) => 'cube_map_dir' in item)
						.map((item) => formURL(item.cube_map_dir)),
				);
				const navMarkerCount = res.filter(
					(item) =>
						item.type === 'NavMarker' && item.props.hide === false,
				).length;
				dispatch(setNavMarkerCount(navMarkerCount));
			})
			.catch(() => {
				setRoomObjects([]);
				setLinkedScenes([]);
			});
		dispatch(resetCurrentAccessibilityNavIdx());
	}, [sceneData.id]);

	const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;

	const formatDate = (date, format) => {
		const map = {
			mm: date.getMonth() + 1,
			dd: date.getDate(),
			yy: date.getFullYear().toString().slice(-2),
			hh: date.getHours().toString(),
			yyyy: date.getFullYear(),
		};

		return format.replace(/mm|dd|hh|yy|yyy/gi, (matched) => map[matched]);
	};

	const getBustKey = (sceneJson) => {
		if (sceneJson?.image_integrity) {
			return sceneData.image_integrity.replace(/\D/g, '');
		}
		return formatDate(new Date(), 'hhmmddyyyy');
	};

	const bgConfig = {
		isFlatScene: !!sceneData.flat_scene_url,
		backgroundUrl: formURL(url),
		imageIntegrity: getBustKey(sceneData),
		useWebp: webpSupport,
	};

	const onNavMarkerClicked = (data) => {
		setRoomObjects([]);

		navigate(scenes[data.linked_room_id.$oid].name);
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
		console.log('=> data', data);
		const audioFile = formURL(data.url);
		const audio = new Audio(audioFile);
		audio.play();

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

	const onSceneMouseUp = (e, sceneObject, marker) => {
		if (marker) {
			const { type, props } = marker.userData;
			if (type === 'NavMarker') {
				onNavMarkerClicked(props);
			} else if (type === 'HotspotMarker') {
				onHotspotMarkerClicked(props);
			}
		}
	};

	const onEnterKeyToSelectNavMarker = (e, marker, isMarkerActive) => {
		if (e.key === 'Enter' && marker && isMarkerActive) {
			e.preventDefault();
			const { props } = marker.userData;
			onNavMarkerClicked(props);
		}
	};

	// Note: If you are trying to find why the entire UI lods twice initially, it is here.
	// Layout is rendered twice causing all the other elements to re-render.
	return sceneData ? (
		<Scene
			sceneId={sceneData.id}
			bgConf={bgConfig}
			linkedScenes={linkedScenes}
			allowHotspotsToMove={false}
			onMouseUp={(e, sceneObject, marker, isDragEvent) =>
				onSceneMouseUp(e, sceneObject, marker, isDragEvent)
			}
			allReduxStoreData={allReduxStoreData}
			dispatch={dispatch}
		>
			<RoomObjects
				roomObjects={roomObjects}
				allReduxStoreData={allReduxStoreData}
				onEnterKeyToSelectNavMarker={onEnterKeyToSelectNavMarker}
			/>
		</Scene>
	) : null;
};

Room.propTypes = {
	sceneData: PropTypes.object.isRequired,
	webpSupport: PropTypes.bool,
};

Room.defaultProps = {
	webpSupport: true,
};
export default Room;
