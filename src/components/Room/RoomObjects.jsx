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
import { isMobile } from 'react-device-detect';

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
			if (arrowState === 'hover') {
				if (item.props?.hover_icon) {
					return formURL(item.props.hover_icon);
				}
			} else {
				if (item.props?.icon) {
					return formURL(item.props.icon);
				}
			}
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

	const { isEnabled: creatorToolsEnabled, hideNavigation } = useSelector(
		(state) => state?.creatorTools,
	);

	const hideNavigationForCreatorTools = creatorToolsEnabled && hideNavigation;

	return (
		<Hotspot
			{...props}
			type="HotspotMarker"
			collider_transform={item.collider_transform}
			transform={item.transform}
			iconConfig={{
				showIcon: hideNavigationForCreatorTools
					? false
					: item?.props?.hide === false,
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

	const isProductImage = hotspotType === 'product_image';

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

	const inSceneVideoOnClick = () => {
		collect({
			eventCategory: 'Content',
			eventAction: 'In-scene video',
			eventLabel: formURL(item?.props?.url),
		});
	};

	const interactiveGlbOnClick = () => {
		collect({
			eventCategory: 'Custom',
			eventAction: '3D product interacted',
			eventLabel: item?.props?.data?.glbObjectUrl,
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
				id={item._id.$oid}
				srcs={item.props.data.srcs}
				similarity={item.props.data.similarity}
				smoothness={item.props.data.smoothness}
				spill={item.props.data.spill}
				autoPlay={item.props.data?.autoPlay}
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
				userData={{
					props: item?.props,
					type: item.type,
					recordId: item._id.$oid,
				}}
				keyColor={item?.props?.chroma_key}
				onClick={inSceneVideoOnClick}
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

	if (isProductImage) {
		return (
			<InSceneImageComponent
				{...props}
				src={formURL(item?.props?.image?.image)}
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
				hotspotData={item}
				onMouseUp={props.onMouseUp}
				onClick={interactiveGlbOnClick}
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
			labelProps.visible = item?.props?.show_on_load || false;
		}
	}
	const userData = {
		props: { ...item?.props, hotspotId: item?._id?.$oid || '' } || {},
		type: item.type,
		focusOnClick: item?.focus_on_click || false,
	};

	const {
		isEnabled: creatorToolsEnabled,
		hideProductHotspots,
		hideContentHotspots,
	} = useSelector((state) => state?.creatorTools);

	const isProductHotspot = hotspotType === 'product';

	const hideForCreatorTools =
		(isProductHotspot && hideProductHotspots) ||
		(!isProductHotspot && hideContentHotspots);

	let hotspotConfig = {};

	if (hotspotType === '3d_model') {
		hotspotConfig = {
			...hotspotConfig,
			type: '3d_model',
			visualObjectConf: {
				url: item?.props?.url && formURL(item.props.url),
			},
		};
	}

	return (
		<Hotspot
			{...props}
			type={item?.type}
			collider_transform={item.collider_transform}
			transform={item.transform}
			visualObjectConf={{ animationType: item?.props?.animation_type || item?.userData?.props?.animation_type }}
			iconConfig={{
				showIcon:
					creatorToolsEnabled && hideForCreatorTools
						? false
						: item?.props?.show_icon,
			}}
			userData={userData}
			imageURL={getHotspotImage(item?.props?.icon, 'default')}
			imageHoverURL={getHotspotImage(item?.props?.hover_icon, 'hover')}
			{...labelProps}
			{...hotspotConfig}
		/>
	);
};

HotspotMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const RoomObjects = ({ ...props }) => {
	const roomObjects = useSelector((state) => state?.roomObjects || []);

	const skipProductIfNotInDBFromConfig =
		useSelector(
			(state) =>
				state?.storeData?.hotspots_configuration
					?.hide_if_product_not_in_db,
		) || false;

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
				if (item?.props?.hotspot_type === 'product') {
					const itemNotInDB = item?.product_in_db === false;
					if (skipProductIfNotInDBFromConfig && itemNotInDB) {
						return null;
					}
				}

				if (
					(isMobile && item.show_only_on !== 'desktop') ||
					(!isMobile && item.show_only_on !== 'mobile')
				) {
					if (item.type === 'NavMarker') {
						navMarkerIndexCounter += 1;
						return (
							<NavMarker
								key={item._id.$oid}
								item={item}
								{...props}
								activeNavIndex={activeNavIndex}
								navMarkerIndex={navMarkerIndexCounter}
								onAccessibilityMarkerClicked={props.onMouseUp}
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
							focusOnClick={item?.focus_on_click || false}
							onMouseUp={props.onHotspotMarkerClicked}
							onAccessibilityMarkerClicked={props.onMouseUp}
							activeHotspotIndex={activeHotspotIndex}
							hotspotMarkerIndex={hotspotMarkerIndexCounter}
							accessibilityHighlightColor="gray"
							animation={{
								...item.animation_props,
								baseScale: item?.transform[0] || 1,
							}}
						/>
					);
				}
			})}
		</>
	);
};

RoomObjects.propTypes = {};

export default RoomObjects;
