import React from 'react';
import PropTypes from 'prop-types';
import Hotspot from 'threejs_scene/Hotspot';
import AnimatedGLB from 'threejs_scene/AnimatedGLB';
import config from 'config';
import { useSelector } from 'react-redux';
import { formURL } from '../../utils/apiUtils';

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

	return `${config.CDN_BASE_URL}/${arrowKey}`;
};

const NavMarker = ({ item, ...props }) => {
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
			userData={{ props: item?.props || {}, type: item.type }}
		/>
	);
};

NavMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const defaultHotspotIconsKeys = {
	product: 'product_hotspot_icon',
	image: 'image_hotspot_icon',
	video: 'video_hotspot_icon',
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

	const getHotspotImage = () => {
		const typeKey = defaultHotspotIconsKeys[hotspotType];
		let url = '';
		if (typeKey) {
			const hotspotIconSearchKey = stylingIcons[typeKey].name;
			if (hotspotIconSearchKey in storeIconFiles) {
				url = formURL(storeIconFiles[hotspotIconSearchKey].url);
			} else if (hotspotIconSearchKey in defaultIcons) {
				url = formURL(defaultIcons[hotspotIconSearchKey]);
			}
		}

		return url;
	};

	const isAnimatedGlb =
		hotspotType === 'custom' && selector === 'animated_glb';

	return isAnimatedGlb ? (
		<AnimatedGLB scene={item.scene.$oid} {...props} />
	) : (
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
			// imageURL={getHotspotImage()}
		/>
	);
};

HotspotMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const RoomObjects = ({ roomObjects, ...props }) => {
	if (roomObjects.length <= 0) return null;
	let navMarkerStartIdx = -1;

	return (
		<>
			{roomObjects.map((item) => {
				if (item.type === 'NavMarker') {
					const isNavMarkerVisible = !item.props.hide;
					if (isNavMarkerVisible) navMarkerStartIdx += 1;
					return (
						<NavMarker
							item={item}
							key={item._id.$oid}
							navMarkerIdx={
								isNavMarkerVisible
									? navMarkerStartIdx
									: undefined
							}
							{...props}
						/>
					);
				}
				return (
					<HotspotMarker item={item} {...props} key={item._id.$oid} />
				);
			})}
		</>
	);
};

RoomObjects.propTypes = {
	roomObjects: PropTypes.array.isRequired,
};
export default RoomObjects;
