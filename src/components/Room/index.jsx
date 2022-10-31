import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene from 'threejs_scene/Scene';
import { preLoadConnectedScenes } from 'threejs_scene/sceneUtils';
import { isMobile } from 'react-device-detect';
import SoundHotspot from './SoundHotspot';
import EntranceVideo from './EntranceVideo';
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
import {
	setActiveScene,
	setRenderUI,
} from '../../redux_stores/sceneLoadReducer/actions';
import { popFromMediaStack } from '../../redux_stores/mediaControllerReducer/actions';
import { getBustKey } from '../../utils/urlHelpers';
import { getSceneType } from '../../utils/sceneUtils';
import ToolTipLoader from '../loaders/ToolTipLoader';

let soundMarkerTracker;

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
	const roomObjects = useSelector((state) => state?.roomObjects || {});
	const { tooltips = [] } = useSelector(
		(state) => state?.componentConfig || {},
	);

	const { activeLocale, enabled: localesEnabled } = useLocalize();
	const abortControl = new AbortController();
	const flatSceneUrl = isMobile
		? sceneData?.mobile_flat_scene_url
		: sceneData?.flat_scene_url;

	const opacityMapUrl = sceneData?.opacity_map || null;

	const entranceVideoUrl = isMobile
		? sceneData?.mobile_first_scene_video_url
		: sceneData?.first_scene_video_url;

	const stylingIcons = useSelector(
		(state) => state?.storeData?.styling?.icons || {},
	);
	const storeIconFiles = useSelector(
		(state) => state?.storeData?.styling?.store_icon_files || {},
	);

	const [showEntranceVideo, setShowEntranceVideo] = useState(false);

	const [linkedScenes, setLinkedScenes] = useState([]);
	const [sceneBGLoaded, setSceneBGLoaded] = useState(false);

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

	const sceneType = getSceneType(sceneData);

	const getEntranceVideo = () => {
		const videoRecord = sessionStorage.getItem('entranceVideoRecord') || [];
		if (
			entranceVideoUrl &&
			(!sceneData.display_video_once_per_session ||
				!videoRecord.includes(sceneData.id))
		) {
			setShowEntranceVideo(true);
			if (!videoRecord.includes(sceneData.id)) {
				sessionStorage.setItem('entranceVideoRecord', [
					...videoRecord,
					sceneData.id,
				]);
			}
		} else {
			setShowEntranceVideo(false);
		}
	};

	const initNewScene = () => {
		getEntranceVideo();
		getSceneObjects(sceneData.id, activeLocale)
			.then((res) => {
				dispatch(setRoomObjects(res));
			})
			.catch(() => {
				dispatch(setRoomObjects([]));
				setLinkedScenes([]);
			});
		sendGaTrackingData({ event: 'scene_loaded' });
		dispatch(setActiveScene(sceneData.id));
		dispatch(clearMediaStack());
	};

	const countNavMarkersForADA = () => {
		const navCount = Object.values(roomObjects).filter(
			(item) => item.type === 'NavMarker',
		).length;
		const nonNavCount = Object.values(roomObjects).filter(
			(item) => item.type !== 'NavMarker',
		).length;
		dispatch(setNavMarkerCount(navCount));
		dispatch(setHotspotMarkerCount(nonNavCount));
	};

	const getSceneCubeMapDir = (scene) => {
		if (
			localesEnabled &&
			'translations' in scene &&
			activeLocale in scene.translations
		) {
			return formURL(scene.translations[activeLocale].cube_map_dir);
		}
		return formURL(scene.cube_map_dir);
	};

	const getLinkedScenes = () =>
		Object.values(roomObjects)
			.filter((item) => item.type === 'NavMarker')
			.map((item) => scenes[item?.props?.linked_room_id.$oid])
			.filter((item) => item && getSceneType(item) === 'cubemap_scene')
			.map((item) => ({
				sceneId: item?.id,
				imageIntegrity: getBustKey(item),
				cube_map_dir: getSceneCubeMapDir(item),
				useWebp: webpSupport,
			}));

	useEffect(() => {
		if (Object.values(roomObjects).length > 0) {
			countNavMarkersForADA();
			setLinkedScenes(getLinkedScenes());
		}
	}, [roomObjects]);

	const cleanup = () => {
		dispatch(setRoomObjects([]));
		setSceneBGLoaded(false);
		dispatch(setActiveNavIndex(undefined));
		dispatch(setActiveHotspotIndex(undefined));
		dispatch(setAccessibilitySelector(undefined));
	};

	useEffect(() => {
		initNewScene();

		return () => {
			abortControl.abort();
			cleanup();
		};
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

	const getBackgroundUrl = () => {
		if (sceneType === 'cubemap_scene') {
			return getSceneCubeMapDir(sceneData);
		}
		return formURL(flatSceneUrl);
	};

	let bgConfig = {
		isFlatScene: !!sceneData.flat_scene_url,
		backgroundUrl: getBackgroundUrl(),
		opacityMapUrl: opacityMapUrl && formURL(opacityMapUrl),
		imageIntegrity: getBustKey(sceneData),
		useWebp: webpSupport,
		skipLargest: isMobile,
		materialProperties: sceneData?.material_properties || null,
		sceneType,
		_3dModelURL: sceneData?.model_url && formURL(sceneData?.model_url),
		...(sceneData?.ambient_light?.enabled
			? { ambient_light: sceneData.ambient_light }
			: {}),
		...(sceneData?.directional_light?.enabled
			? { directional_light: sceneData.directional_light }
			: {}),
		...(sceneData?.environment_map
			? { environmentMapURL: formURL(sceneData?.environment_map) }
			: {}),
		...(sceneData?.use_scene_background_as_environment_map &&
		!sceneData?.environment_map
			? {
					use_scene_background_as_environment_map:
						sceneData.use_scene_background_as_environment_map,
			  }
			: {}),
		glb_model_position: sceneData?.glb_model_position,
	};

	if (['3d_model_scene', '3d_scene'].includes(sceneType)) {
		bgConfig = {
			...bgConfig,
			backgroundUrl:
				sceneData?.scene_background &&
				formURL(sceneData.scene_background),
		};
	}

	const onNavMarkerClicked = (data) => {
		const currentScene = scenes[sceneData.id].name;
		const nextScene = scenes[data.linked_room_id.$oid].name;
		collect({
			eventCategory: 'Navigation',
			eventAction: 'Arrow clicked',
			eventLabel: `${currentScene} > ${nextScene}`,
		});
		navigate(nextScene);
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
			case 'product_carousel':
				dispatch(
					setModalProps('product', {
						...data,
						visible: true,
						carousel: true,
					}),
				);
				break;
			case 'custom':
				if (data?.selector === 'glb_event_hotspot') {
					document.dispatchEvent(
						new CustomEvent(data?.selector, {
							detail: data.data,
						}),
					);
				} else {
					dispatch(
						setModalProps(data.selector, {
							...data,
							visible: true,
						}),
					);
				}
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

	const getSceneTransitionIcon = () => {
		if (
			'transition_icon' in stylingIcons &&
			stylingIcons.transition_icon.name in storeIconFiles
		) {
			return formURL(
				storeIconFiles[stylingIcons.transition_icon.name].url,
			);
		}
		return null;
	};

	const onVideoEnd = () => {
		setShowEntranceVideo(false);
	};

	const preLoadConnectedScenesRoomObjects = async () =>
		Promise.all(
			linkedScenes.map((item) =>
				getSceneObjects(item.sceneId, activeLocale),
			),
		);

	useEffect(() => {
		if (sceneBGLoaded && linkedScenes.length > 0) {
			console.log('=> linkedScenes', linkedScenes);
			preLoadConnectedScenes(linkedScenes, abortControl);
			preLoadConnectedScenesRoomObjects();
		}
	}, [sceneBGLoaded, linkedScenes]);

	const onBgLoaded = () => {
		setSceneBGLoaded(true);
	};

	const onBGReady = () => {
		dispatch(setRenderUI(true));
	};

	const {
		isEnabled: creatorToolsEnabled,
		autoPan,
		panSpeed,
	} = useSelector((state) => state?.creatorTools);

	const autoRotateConfig =
		creatorToolsEnabled && !bgConfig.isFlatScene && autoPan === 'true'
			? { enabled: autoPan === 'true', autoRotateSpeed: panSpeed }
			: { enabled: false };

	// Note: If you are trying to find why the entire UI lods twice initially, it is here.
	// Layout is rendered twice causing all the other elements to re-render.
	return sceneData ? (
		<>
			{!showEntranceVideo && (
				<Scene
					sceneId={sceneData.id}
					bgConf={bgConfig}
					allowHotspotsToMove={false}
					onMouseUp={(e, sceneObject, marker, isDragEvent) =>
						onSceneMouseUp(e, sceneObject, marker, isDragEvent)
					}
					dispatch={dispatch}
					fps={isMobile ? 30 : 60}
					enablePan={bgConfig?.isFlatScene}
					type="containerInstance"
					orbitControlsConfig={sceneData?.controls}
					cameraProperties={sceneData?.camera?.camera_properties}
					loadingIconSrc={getSceneTransitionIcon()}
					onBackgroundLoaded={onBgLoaded}
					onBackgroundReady={onBGReady}
					autoRotateConfig={autoRotateConfig}
					tooltipComponents={ToolTipLoader(tooltips)}
				>
					<RoomObjects
						onMouseUp={(e, sceneObject, marker, isDragEvent) =>
							onSceneMouseUp(e, sceneObject, marker, isDragEvent)
						}
						onHotspotMarkerClicked={onHotspotMarkerClicked}
					/>
					<SoundHotspot
						audioFile={audioFile}
						handleSoundStop={handleSoundStop}
					/>
				</Scene>
			)}
			{showEntranceVideo && (
				<EntranceVideo
					videoUrl={formURL(entranceVideoUrl)}
					onVideoEnd={onVideoEnd}
					onClose={() => {
						setShowEntranceVideo(false);
						sendGaTrackingData({
							eventCategory: 'Custom',
							eventAction: 'Intro skipped',
							eventLabel: 'Store intro',
						});
					}}
				/>
			)}
		</>
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
