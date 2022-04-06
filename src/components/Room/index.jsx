import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene from 'threejs_scene/Scene';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import './room.scss';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';
import { resetCurrentAccessibilityNavIdx } from '../../redux_stores/accessibilityReducer/actions';
import RoomObjects from './RoomObjects';
import useLocalize from '../../hooks/useLocalize';
import useLocalizedNavigation from '../../hooks/useLocalizedNavigation';
import useAnalytics from '../../hooks/useAnalytics';
import { setRoomObjects } from '../../redux_stores/roomObjectsReducer/actions';
import { isMobile } from 'react-device-detect';
import { setActiveScene } from '../../redux_stores/sceneLoadReducer/actions';

const Room = ({ sceneData, webpSupport }) => {
	const dispatch = useDispatch();

	// const [linkedScenes, setLinkedScenes] = useState([]);

	const scenes = useSelector((state) => state.scenes);

	const { navigate } = useLocalizedNavigation();
	const { collect } = useAnalytics();

	const { activeLocale } = useLocalize();

	console.log('=> Room-');

	const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;

	const sendGaTrackingData = (data) => {
		if (data?.hotspot_type === 'product') {
			collect({
				eventCategory: 'Product',
				eventAction: 'Product hotspot clicked',
				eventLabel: data.product_sku,
			});
		} else if (data?.event === 'scene_loaded') {
			collect({
				eventCategory: 'Navigation',
				eventAction: 'Scene loaded',
				eventLabel: scenes[sceneData.id].name,
				non_interaction: true,
			});
			collect({
				sceneName: scenes[sceneData.id].name,
				pageView: true,
			});
		} else {
			collect(data);
		}
	};

	useEffect(() => {
		getSceneObjects(sceneData.id, activeLocale)
			.then((res) => {
				dispatch(setRoomObjects(res));
				// setLinkedScenes(
				// 	res
				// 		.filter((item) => item.type === 'NavMarker')
				// 		.map((item) => scenes[item?.props?.linked_room_id.$oid])
				// 		.filter((item) => 'cube_map_dir' in item)
				// 		.map((item) => formURL(item.cube_map_dir)),
				// );
			})
			.catch(() => {
				dispatch(setRoomObjects([]));
				// setLinkedScenes([]);
			});
		sendGaTrackingData({ event: 'scene_loaded' });
		dispatch(setActiveScene(sceneData.id));
	}, [sceneData.id]);

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
		skipLargest: isMobile,
	};

	const onNavMarkerClicked = (data) => {
		dispatch(setRoomObjects([]));

		navigate(scenes[data.linked_room_id.$oid].name);
		collect({
			eventCategory: 'Navigation',
			eventAction: 'Arrow clicked',
			eventLabel: scenes[sceneData.id].name,
		});
	};

	const onLinkMarkerClicked = (data) => {
		const linkUrl = formURL(data.url);
		window.open(linkUrl, '_blank');

		collect({
			eventCategory: 'Content',
			eventAction: 'Link',
			eventLabel: linkUrl,
		});
	};

	const onSoundMarkerClicked = (data) => {
		// this needs work
		const audioFile = formURL(data.url);
		const audio = new Audio(audioFile);
		audio.play();

		collect({
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
				if (data?.data?.gaConfig) {
					const gaConfig = data?.data?.gaConfig || {};
					sendGaTrackingData({ ...gaConfig });
				}
				break;
			default:
				dispatch(
					setModalProps(data.hotspot_type, {
						...data,
						visible: true,
					}),
				);
				sendGaTrackingData(data);
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
			linkedScenes={[]}
			allowHotspotsToMove={false}
			onMouseUp={(e, sceneObject, marker, isDragEvent) =>
				onSceneMouseUp(e, sceneObject, marker, isDragEvent)
			}
			dispatch={dispatch}
			fps={isMobile ? 30 : 60}
		>
			<RoomObjects
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
