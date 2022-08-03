import React from 'react';
import PropTypes from 'prop-types';
import Hotspot from 'threejs_scene/Hotspot';
import AnimatedGLB from 'threejs_scene/AnimatedGLB';
import InSceneVidComponent from 'threejs_scene/InSceneVidComponent';
import InSceneImageComponent from 'threejs_scene/InSceneImageComponent';
import FireEffect from 'threejs_scene/FireEffect';
import WaterEffect from 'threejs_scene/WaterEffect';
import GreenScreenSystem from 'threejs_scene/GreenScreenSystem';
import InteractiveGLB from 'threejs_scene/InteractiveGLB';
import config from 'config';
import { useSelector, useDispatch } from 'react-redux';
import {
	ICON_NAMES,
	IN_SCENE_VIDEO_PLAY_ICON,
	IN_SCENE_VIDEO_PAUSE_ICON,
} from '../../utils/hotspotConstants';
import { formURL } from '../../utils/apiUtils';

const paylo = {
	props: {
		data: {
			objectTransform: {
				position: {
					x: -1.735,
					y: -0.471,
					z: 0.125,
				},
				rotation: {
					x: 0,
					y: 1.5707963267948966,
					z: 0,
				},
				scale: {
					x: 0.6,
					y: 0.6,
					z: 0.6,
				},
			},
			glbScale: {
				x: 0.8,
				y: 0.8,
				z: 0.8,
			},
			collider_transform: [
				1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -8.30267773526267,
				-0.24269834839972154, -5.56836061476424, 1,
			],
			envMaps: {
				nx: 'https://cdn.obsess-vr.com/prada/envmap_v2/nx.jpg',
				ny: 'https://cdn.obsess-vr.com/prada/envmap_v2/ny.jpg',
				nz: 'https://cdn.obsess-vr.com/prada/envmap_v2/nz.jpg',
				px: 'https://cdn.obsess-vr.com/prada/envmap_v2/px.jpg',
				py: 'https://cdn.obsess-vr.com/prada/envmap_v2/py.jpg',
				pz: 'https://cdn.obsess-vr.com/prada/envmap_v2/pz.jpg',
			},
			glbObjectUrl:
				'https://cdn.obsess-vr.com/prada/Prada_PerfumeBottle_v100.glb',
			hotspots: [
				{
					transform: {
						position: {
							x: -0.5,
							y: -0.3,
							z: 0.091,
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0,
						},
						scale: {
							x: 0.0014,
							y: -0.0014,
							z: 0.0014,
						},
					},
					props: {
						_cls: 'VideoWithButtonProps',
						button_url: {
							origin: 'external',
							path: '',
						},
						hotspot_type: 'video_with_button',
						show_icon: true,
						url: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Prada/6266e8c2716212a167423e84/images/hotspots/76067pradavideoparadoxe.mp4',
						},
						icon: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/prada/Neon_hand_icon-1.svg',
						},
					},
				},
				{
					transform: {
						position: {
							x: 0.836,
							y: -0.35,
							z: -0.1,
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0,
						},
						scale: {
							x: 0.0014,
							y: -0.0014,
							z: 0.0014,
						},
					},
					props: {
						_cls: 'VideoWithButtonProps',
						button_url: {
							origin: 'external',
							path: '',
						},
						hotspot_type: 'video_with_button',
						show_icon: true,
						url: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Prada/6266e8c2716212a167423e84/images/hotspots/76067pradavideoparadoxe.mp4',
						},
						icon: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/prada/Neon_hand_icon-1.svg',
						},
					},
				},
				{
					transform: {
						position: {
							x: -0.5,
							y: 1,
							z: -0.1,
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0,
						},
						scale: {
							x: 0.0014,
							y: -0.0014,
							z: 0.0014,
						},
					},
					props: {
						_cls: 'VideoWithButtonProps',
						button_url: {
							origin: 'external',
							path: '',
						},
						hotspot_type: 'video_with_button',
						show_icon: true,
						url: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Prada/6266e8c2716212a167423e84/images/hotspots/76067pradavideoparadoxe.mp4',
						},
						icon: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/prada/Neon_hand_icon-1.svg',
						},
					},
				},
				{
					transform: {
						position: {
							x: 0.3,
							y: 0.55,
							z: 0.1,
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0,
						},
						scale: {
							x: 0.002,
							y: 0.002,
							z: 0.002,
						},
					},
					props: {
						_cls: 'LinkHotspotProps',
						hotspot_type: 'link',
						show_icon: true,
						url: {
							origin: 'external',
							path: 'https://www.instagram.com/ar/746886709684047/?ch=YjQ3NDAxMzFmOTFiMzgwMWEwY2FlMWY5MzM5MGFkYzU%3D',
						},
						icon: {
							origin: 'external',
							path: 'https://cdn.obsess-vr.com/prada/AR%20filter%20hotspot.svg',
						},
					},
				},
			],
		},
	},
};

const NavMarker = ({ item, ...props }) => {
	const navigationArrowIcon = useSelector(
		(state) => state?.storeData?.styling?.icons?.nav_arrow_icon?.name || '',
	);
	const navigationArrowIconHover = useSelector(
		(state) =>
			state?.storeData?.styling?.icons?.nav_arrow_icon_hover?.name || '',
	);
	const storeIconFiles = useSelector(
		(state) => state?.storeData?.styling?.store_icon_files || {},
	);

	const getNavMarkerImage = (type, arrowState = 'default') => {
		const arrowsMap = {
			stairs_up: 'stairs-up-black.svg',
			stairs_down: 'stairs-down-black.svg',
			up: 'arrow-black.svg',
		};

		let arrowKey = 'arrow.svg';
		if (type in arrowsMap) {
			arrowKey = arrowsMap[type];
		}
		const arrowUrl = `${config.CDN_BASE_URL}/${arrowKey}`;

		if (type === 'stairs_up' || type === 'stairs_down') {
			return arrowUrl;
		}

		if (arrowState === 'hover') {
			if ('hover_icon' in item.props) {
				return formURL(item.props.hover_icon);
			}
			if (navigationArrowIconHover) {
				return formURL(storeIconFiles[navigationArrowIconHover]?.url);
			}
		}

		if (arrowState === 'default') {
			if ('icon' in item.props) {
				return formURL(item.props.icon);
			}
			if (navigationArrowIcon) {
				return formURL(storeIconFiles[navigationArrowIcon]?.url);
			}
		}

		return arrowUrl;
	};

	return (
		<Hotspot
			{...props}
			type="HotspotMarker"
			collider_transform={item.collider_transform}
			transform={item.transform}
			iconConfig={{
				showIcon: item?.props?.hide === false,
			}}
			imageURL={getNavMarkerImage(
				item?.props?.sprite_type || '',
				'default',
			)}
			imageHoverURL={getNavMarkerImage(
				item?.props?.sprite_type || '',
				'hover',
			)}
			userData={{
				props: item?.props || {},
				type: item.type,
			}}
		/>
	);
};

NavMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const HotspotMarker = ({ item, ...props }) => {
	const defaultIcons = useSelector((state) => state.defaultIcons || {});
	const stylingIcons = useSelector(
		(state) => state?.storeData?.styling?.icons || {},
	);
	const storeIconFiles = useSelector(
		(state) => state?.storeData?.styling?.store_icon_files || {},
	);
	const { hotspot_type: hotspotType, selector } = item?.props || {};

	const { pushToMediaStack, popFromMediaStack } = useSelector(
		(state) => state?.mediaController,
	);

	const { useAnalytics } = useSelector((state) => state.shareableFunctions);
	const { collect } = useAnalytics();

	const dispatch = useDispatch();

	const getHotspotImage = (specificIcon, hotspotState = 'default') => {
		const iconNameKey = ICON_NAMES?.[hotspotType]?.[hotspotState];
		const hotspotIconSearchKey = stylingIcons[iconNameKey]?.name;

		let url = '';
		if (hotspotIconSearchKey in defaultIcons) {
			url = formURL(defaultIcons[hotspotIconSearchKey]);
		}
		if (hotspotIconSearchKey in storeIconFiles) {
			url = formURL(storeIconFiles[hotspotIconSearchKey]?.url);
		}
		if (specificIcon) {
			url = formURL(specificIcon);
		}
		return url;
	};

	const isAnimatedGlb =
		hotspotType === 'custom' && selector === 'animated_glb';

	const isEmbeddedVideo = hotspotType === 'embedded_video';

	const isImage = hotspotType === 'embedded_image';
	const isGreenScreenSystem =
		hotspotType === 'custom' && selector === 'green_screen_system';
	const isFireEffect = hotspotType === 'custom' && selector === 'fire_effect';
	const isWaterEffect =
		hotspotType === 'custom' && selector === 'water_effect';

	const isInteractiveGlb =
		hotspotType === 'custom' && selector === 'interactive_glb';

	const addToMediaStackWrapper = (ref) => {
		dispatch(pushToMediaStack(ref));
	};

	const popFromMediaStackWrapper = () => {
		dispatch(popFromMediaStack());
	};

	const onPlayClicked = (src) => {
		collect({
			eventCategory: 'Content',
			eventAction: 'In-scene video',
			eventLabel: src,
		});
	};

	const onPauseClicked = (src) => {
		collect({
			eventCategory: 'Content',
			eventAction: 'In-scene video',
			eventLabel: src,
		});
	};

	if (isFireEffect) {
		return (
			<FireEffect
				{...props}
				roomId={item.scene.$oid}
				position={item.props.data.position}
				scale={item.props.data.scale}
				rotation={item.props.data.rotation}
				magnitude={item.props.data.magnitude}
				lacunarity={item.props.data.lacunarity}
				gain={item.props.data.gain}
				speed={item.props.data.speed}
			/>
		);
	}
	if (isWaterEffect) {
		return (
			<WaterEffect
				{...props}
				roomId={item.scene.$oid}
				position={item.props.data.position}
				rotation={item.props.data.rotation}
				scale={item.props.data.scale}
				size={item.props.data.size}
				distortionScale={item.props.data.distortionScale}
			/>
		);
	}
	if (isGreenScreenSystem) {
		return (
			<GreenScreenSystem
				{...props}
				srcs={item.props.data.srcs}
				similarity={item.props.data.similarity}
				smoothness={item.props.data.smoothness}
				spill={item.props.data.spill}
				keyColor={item.props.data.keyColor}
				roomId={item.scene.$oid}
			/>
		);
	}
	if (isEmbeddedVideo) {
		return (
			<InSceneVidComponent
				{...props}
				src={formURL(item?.props?.url)}
				transform={item.transform}
				userData={{ props: item?.props, type: item.type }}
				keyColor={item?.props?.chroma_key}
				onPlayClicked={onPlayClicked}
				onPauseClicked={onPauseClicked}
				addToMediaStack={addToMediaStackWrapper}
				popFromMediaStack={popFromMediaStackWrapper}
				playIconUrl={IN_SCENE_VIDEO_PLAY_ICON}
				pauseIconUrl={IN_SCENE_VIDEO_PAUSE_ICON}
			/>
		);
	}

	if (isImage) {
		return (
			<InSceneImageComponent
				{...props}
				src={formURL(item?.props?.url)}
				transform={item.transform}
			/>
		);
	}

	if (isAnimatedGlb) {
		return (
			<AnimatedGLB scene={item.scene.$oid} collect={collect} {...props} />
		);
	}

	if (isInteractiveGlb) {
		return (
			<InteractiveGLB
				{...props}
				item={item}
				hotspotData={paylo}
				onMouseUp={props.onMouseUp}
			/>
		);
	}
	const labelProps = {};
	if (item.type === 'Label') {
		labelProps.containerStyling = item?.props?.container;
		labelProps.labelStyling = item?.props?.label;

		if (item?.props?.hotspot_type === 'tooltip') {
			labelProps.arrowConfig = {
				arrow_color: item?.props?.arrow_color,
				arrow_direction: item?.props?.arrow_direction,
			};
			labelProps.visible = false;
		}
	}
	const userData = {
		props: { ...item?.props, hotspotId: item?._id?.$oid || '' } || {},
		type: item.type,
	};

	return (
		<Hotspot
			{...props}
			type={item?.type}
			collider_transform={item.collider_transform}
			transform={item.transform}
			iconConfig={{
				showIcon: item?.props?.show_icon,
			}}
			userData={userData}
			imageURL={getHotspotImage(item?.props?.icon, 'default')}
			imageHoverURL={getHotspotImage(item?.props?.hover_icon, 'hover')}
			{...labelProps}
		/>
	);
};

HotspotMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const RoomObjects = ({ ...props }) => {
	const roomObjects = useSelector((state) => state?.roomObjects || []);

	const roomObjectsArr = Object.keys(roomObjects).map(
		(key) => roomObjects[key],
	);

	const { activeNavIndex, activeHotspotIndex } = useSelector(
		(state) => state?.accessibility,
	);

	let navMarkerIndexCounter = -1;
	let hotspotMarkerIndexCounter = -1;

	if (roomObjectsArr.length <= 0) return null;

	return (
		<>
			{roomObjectsArr.map((item) => {
				if (item.type === 'NavMarker') {
					navMarkerIndexCounter += 1;
					return (
						<NavMarker
							key={item._id.$oid}
							item={item}
							{...props}
							activeNavIndex={activeNavIndex}
							navMarkerIndex={navMarkerIndexCounter}
							accessibilityHighlightColor="gray"
							animation={{
								...item.animation_props,
								baseScale: item?.transform[0] || 1,
							}}
						/>
					);
				}
				hotspotMarkerIndexCounter += 1;
				return (
					<HotspotMarker
						key={item._id.$oid}
						item={item}
						{...props}
						onMouseUp={props.onHotspotMarkerClicked}
						activeHotspotIndex={activeHotspotIndex}
						hotspotMarkerIndex={hotspotMarkerIndexCounter}
						accessibilityHighlightColor="gray"
						animation={{
							...item.animation_props,
							baseScale: item?.transform[0] || 1,
						}}
					/>
				);
			})}
		</>
	);
};

RoomObjects.propTypes = {};

export default RoomObjects;
