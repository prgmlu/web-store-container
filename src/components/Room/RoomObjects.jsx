import React from 'react';
import PropTypes from 'prop-types';
import Hotspot from 'threejs_scene/Hotspot';
import AnimatedGLB from 'threejs_scene/AnimatedGLB';
import InSceneVidComponent from 'threejs_scene/InSceneVidComponent';
import InSceneImageComponent from 'threejs_scene/InSceneImageComponent';
import GreenScreenSystem from 'threejs_scene/GreenScreenSystem';
import config from 'config';
import { useSelector, useDispatch } from 'react-redux';
import { ICON_NAMES, stylingIconsMock } from '../../utils/hotspotUtils';
import { formURL } from '../../utils/apiUtils';

const NavMarker = ({ item, ...props }) => {
	const navigationArrowIcon = useSelector(
		(state) => state?.storeData?.styling?.navigation_arrow_icon || {},
	);

	const getNavMarkerImage = (type) => {
		const arrowsMap = {
			stairs_up: 'stairs-up-black.svg',
			stairs_down: 'stairs-down-black.svg',
			up: 'arrow-black.svg',
		};

		let arrowKey = 'arrow.svg';
		if (type in arrowsMap) {
			arrowKey = arrowsMap[type];
		}
		let arrowUrl = `${config.CDN_BASE_URL}/${arrowKey}`;

		if (
			navigationArrowIcon &&
			Object.keys(navigationArrowIcon).length > 0
		) {
			arrowUrl = formURL(navigationArrowIcon);
		}

		return arrowUrl;
	};

	return (
		<Hotspot
			{...props}
			type="hotspot"
			collider_transform={item.collider_transform}
			transform={item.transform}
			iconConfig={{
				showIcon: item?.props?.hide === false,
			}}
			imageURL={getNavMarkerImage(item?.props?.sprite_type || '')}
			imageHoverURL={getNavMarkerImage(item?.props?.sprite_type || '')}
			userData={{ props: item?.props || {}, type: item.type }}
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

	const getHotspotImage = (hotspotState = 'default') => {
		const iconNameKey = ICON_NAMES[hotspotType][hotspotState];
		const hotspotIconSearchKey = stylingIcons[iconNameKey]?.name;

		let url = '';
		if (hotspotIconSearchKey in storeIconFiles) {
			url = formURL(storeIconFiles[hotspotIconSearchKey]?.url);
		}
		if (hotspotIconSearchKey in defaultIcons) {
			url = formURL(defaultIcons[hotspotIconSearchKey]);
		}
		return url;
	};

	const isAnimatedGlb =
		hotspotType === 'custom' && selector === 'animated_glb';

	const isVideo = hotspotType === 'embedded_video';

	const isImage = hotspotType === 'embedded_image';
	const isGreenScreenSystem =
		hotspotType === 'custom' && selector === 'green_screen_system';

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

	if (isVideo) {
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

	return (
		<Hotspot
			{...props}
			type="hotspot"
			collider_transform={item.collider_transform}
			transform={item.transform}
			iconConfig={{
				showIcon: item?.props?.show_icon,
			}}
			userData={{
				props:
					{ ...item?.props, hotspotId: item?._id?.$oid || '' } || {},
				type: item.type,
			}}
			imageURL={getHotspotImage('default')}
			imageHoverURL={getHotspotImage('hover')}
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
					/>
				);
			})}
		</>
	);
};

RoomObjects.propTypes = {};
export default RoomObjects;
