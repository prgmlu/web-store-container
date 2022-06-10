import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene from 'threejs_scene/Scene';
import SoundHotspot from './SoundHotspot';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import './room.scss';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';
import {
	setAccessibilitySelector,
	setActiveNavIndex,
	setNavMarkerCount,
	setActiveHotspotIndex,
	setHotspotMarkerCount,
} from '../../redux_stores/accessibilityReducer/actions';
import RoomObjects from './RoomObjects';
import useLocalize from '../../hooks/useLocalize';
import useLocalizedNavigation from '../../hooks/useLocalizedNavigation';
import useAnalytics from '../../hooks/useAnalytics';
import { setRoomObjects } from '../../redux_stores/roomObjectsReducer/actions';
import { isMobile } from 'react-device-detect';
import { setActiveScene } from '../../redux_stores/sceneLoadReducer/actions';
import { popFromMediaStack } from '../../redux_stores/mediaControllerReducer/actions';
let soundMarkerTracker = undefined;

const Room = ({ sceneData, webpSupport }) => {
	const dispatch = useDispatch();

	const scenes = useSelector((state) => state.scenes);
	const {
		accessibilitySelector,
		activeNavIndex,
		navMarkerCount,
		activeHotspotIndex,
		hotspotMarkerCount,
	} = useSelector((state) => state?.accessibility);
	const { navigate } = useLocalizedNavigation();
	const { collect } = useAnalytics();

	const { activeLocale } = useLocalize();

	const flatSceneUrl = isMobile
		? sceneData?.mobile_flat_scene_url
		: sceneData?.flat_scene_url;

	const url = sceneData?.cube_map_dir || flatSceneUrl;

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

	const {
		storeMusicRef,
		mediaStack,
		clearMediaStack,
		setStoreMusicPlayState,
	} = useSelector((state) => state?.mediaController || {});

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
				const navCount = res.filter(
					(item) => item.type === 'NavMarker',
				).length;
				const nonNavCount = res.filter(
					(item) => item.type !== 'NavMarker',
				).length;
				dispatch(setNavMarkerCount(navCount));
				dispatch(setHotspotMarkerCount(nonNavCount));
			})
			.catch(() => {
				dispatch(setRoomObjects([]));
				// setLinkedScenes([]);
			});
		sendGaTrackingData({ event: 'scene_loaded' });
		dispatch(setActiveScene(sceneData.id));
		dispatch(clearMediaStack());
	}, [sceneData.id]);

	useEffect(() => {
		if (!storeMusicRef) return;

		if (mediaStack.length > 0) {
			dispatch(
				setStoreMusicPlayState({
					playState: false,
					userToggled: false,
				}),
			);
			return;
		}

		dispatch(
			setStoreMusicPlayState({
				playState: true,
				userToggled: false,
			}),
		);
	}, [storeMusicRef, mediaStack]);

	const accessibilityListener = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.altKey === false) return;
		if (
			activeNavIndex === undefined &&
			(e.key === 'ArrowLeft' || e.key === 'ArrowRight')
		) {
			dispatch(setAccessibilitySelector('navigation'));
			dispatch(setActiveNavIndex(0));
			dispatch(setActiveHotspotIndex(undefined));
			return;
		}
		if (
			activeHotspotIndex === undefined &&
			(e.key === 'ArrowUp' || e.key === 'ArrowDown')
		) {
			dispatch(setAccessibilitySelector('hotspot'));
			dispatch(setActiveHotspotIndex(0));
			dispatch(setActiveNavIndex(undefined));
			return;
		}

		let updatedNavIndex = activeNavIndex;
		let updatedHotspotIndex = activeHotspotIndex;

		switch (e.key) {
			case 'ArrowLeft':
				updatedNavIndex -= 1;
				break;
			case 'ArrowRight':
				updatedNavIndex += 1;
				break;
			case 'ArrowUp':
				updatedHotspotIndex += 1;
				break;
			case 'ArrowDown':
				updatedHotspotIndex -= 1;
				break;
			default:
				break;
		}

		if (accessibilitySelector === 'navigation') {
			if (updatedNavIndex < 0) {
				updatedNavIndex = navMarkerCount - 1;
			} else if (updatedNavIndex >= navMarkerCount) {
				updatedNavIndex %= navMarkerCount;
			}
			dispatch(setActiveNavIndex(updatedNavIndex));
		}

		if (accessibilitySelector === 'hotspot') {
			if (updatedHotspotIndex < 0) {
				updatedHotspotIndex = hotspotMarkerCount - 1;
			} else if (updatedHotspotIndex >= hotspotMarkerCount) {
				updatedHotspotIndex %= hotspotMarkerCount;
			}
			dispatch(setActiveHotspotIndex(updatedHotspotIndex));
		}
	};

	useEffect(() => {
		document.addEventListener('keyup', accessibilityListener);

		return () => {
			document.removeEventListener('keyup', accessibilityListener);
		};
	}, [activeNavIndex, activeHotspotIndex, accessibilitySelector]);

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
		dispatch(setActiveNavIndex(undefined));
		dispatch(setActiveHotspotIndex(undefined));
		dispatch(setAccessibilitySelector(undefined));

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

	const [audioFile, setAudioFile] = useState('');

	const handleSoundCollect = (soundURL) => {
		collect({
			eventCategory: 'Content',
			eventAction: 'Sound',
			eventLabel: soundURL,
		});
	};

	const handleSoundStart = (hotspotID, soundURL) => {
		setAudioFile(soundURL);
		soundMarkerTracker = hotspotID;
	};

	const handleSoundStop = () => {
		dispatch(popFromMediaStack());
		setAudioFile('');
		soundMarkerTracker = undefined;
	};

	const handleSoundChange = (hotspotID, soundURL) => {
		dispatch(popFromMediaStack());
		setAudioFile(soundURL);
		soundMarkerTracker = hotspotID;
	};

	const onSoundMarkerClicked = (data) => {
		const soundURL = formURL(data.url);
		handleSoundCollect(soundURL);

		if (soundMarkerTracker === undefined) {
			handleSoundStart(data.hotspotId, soundURL);
			return;
		}
		if (soundMarkerTracker === data.hotspotId) {
			handleSoundStop();
			return;
		}
		if (soundMarkerTracker !== data.hotspotId) {
			handleSoundChange(data.hotspotId, soundURL);
		}
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
		}
	};

	const onSceneMouseUp = (e, sceneObject, marker) => {
		if (!marker) return;

		const { type, props } = marker.userData;
		if (type === 'NavMarker') {
			onNavMarkerClicked(props);
		} else if (type === 'HotspotMarker') {
			onHotspotMarkerClicked(props);
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
			type="containerInstance"
			orbitControlsConfig={sceneData?.controls}
		>
			<RoomObjects
				onMouseUp={(e, sceneObject, marker, isDragEvent) =>
					onSceneMouseUp(e, sceneObject, marker, isDragEvent)
				}
			/>
			<SoundHotspot
				audioFile={audioFile}
				handleSoundStop={handleSoundStop}
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
