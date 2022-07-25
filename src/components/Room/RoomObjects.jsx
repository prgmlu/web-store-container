import React from 'react';
import PropTypes from 'prop-types';
import Hotspot from 'threejs_scene/Hotspot';
import AnimatedGLB from 'threejs_scene/AnimatedGLB';
import InSceneVidComponent from 'threejs_scene/InSceneVidComponent';
import InSceneImageComponent from 'threejs_scene/InSceneImageComponent';
import FireEffect from 'threejs_scene/FireEffect';
import WaterEffect from 'threejs_scene/WaterEffect';
import GreenScreenSystem from 'threejs_scene/GreenScreenSystem';
import config from 'config';
import { useSelector, useDispatch } from 'react-redux';
import {
	ICON_NAMES,
	IN_SCENE_VIDEO_PLAY_ICON,
	IN_SCENE_VIDEO_PAUSE_ICON,
} from '../../utils/hotspotConstants';
import { formURL } from '../../utils/apiUtils';
import InteractiveGLB from 'threejs_scene/InteractiveGLB';

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

	const isInteractiveGlb = hotspotType === 'custom' && selector === 'interactive_glb';

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
		const interactiveGLBConfig = {
			objectTransform: {
				position: { x: -1.735, y: -0.471, z: 0.125 },
				rotation: { x: 0, y: Math.PI / 2.0, z: 0 },
				scale: {x:0.6, y:0.6, z:0.6},
			},
			hotspotTransform: [
				{position: { x:-0.5, y:-0.3, z:0.091 }, rotation: {x:0, y:0, z:0}, scale: {x:0.0014, y:-0.0014, z:0.0014}},
				{position: {x:0.836, y:-0.3500, z:-0.1}, rotation: {x:0, y:0, z:0}, scale: {x:0.0014, y:-0.0014, z:0.0014}},
				{position: {x:-0.5, y:1.0, z:-0.1}, rotation: {x:0, y:0, z:0}, scale: {x:0.0014, y:-0.0014, z:0.0014}},
			],
			envMaps: {
				px: 'https://cdn.obsess-vr.com/prada/envmap_v2/px.jpg',
				nx: 'https://cdn.obsess-vr.com/prada/envmap_v2/nx.jpg',
				py: 'https://cdn.obsess-vr.com/prada/envmap_v2/py.jpg',
				ny: 'https://cdn.obsess-vr.com/prada/envmap_v2/ny.jpg',
				pz: 'https://cdn.obsess-vr.com/prada/envmap_v2/pz.jpg',
				nz: 'https://cdn.obsess-vr.com/prada/envmap_v2/nz.jpg',
			},
			hotspotVideoUrl:'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Prada/6266e8c2716212a167423e84/images/hotspots/76067pradavideoparadoxe.mp4',
			glbObjectURL: 'https://cdn.obsess-vr.com/prada/Prada_PerfumeBottle_v097.glb',
			svgHotspotURL: 'https://cdn.obsess-vr.com/prada/Neon_hand_icon-1.svg',
		};
		return (
			<InteractiveGLB 
				{...props}
				objectTransform={interactiveGLBConfig.objectTransform}
				hotspotTransform={interactiveGLBConfig.hotspotTransform}
				envMaps={interactiveGLBConfig.envMaps}
				hotspotVideoUrl={interactiveGLBConfig.hotspotVideoUrl}
				glbObjectURL={interactiveGLBConfig.glbObjectURL}
				svgHotspotURL={interactiveGLBConfig.svgHotspotURL}
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
