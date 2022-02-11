import PropTypes from 'prop-types';
import React from 'react';
import { Hotspot } from 'threejs_scene/lib';

const NavMarker = ({ item, ...props }) => (
	<Hotspot
		{...props}
		type="hotspot"
		collider_transform={item.collider_transform}
		transform={item.transform}
		iconConfig={{ dotColor: 'black' }}
		imageURL="https://obsessvr-webstore-assets-public.s3.amazonaws.com/arrow.svg"
		userData={{ props: item?.props || {}, type: item.type }}
	/>
);

NavMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const HotspotMarker = ({ item, ...props }) => (
	<Hotspot
		{...props}
		type="hotspot"
		collider_transform={item.collider_transform}
		transform={item.transform}
		iconConfig={{ dotColor: 'black' }}
		userData={{
			props: item?.props || {},
			type: item.type,
		}}
	/>
);

HotspotMarker.propTypes = {
	item: PropTypes.object.isRequired,
};

const RoomObjects = ({ roomObjects, ...props }) => (
	<>
		{roomObjects.map((item) => {
			if (item.type === 'NavMarker') {
				return <NavMarker item={item} {...props} key={item._id.$oid} />;
			}
			return <HotspotMarker item={item} {...props} key={item._id.$oid} />;
		})}
	</>
);

RoomObjects.propTypes = {
	roomObjects: PropTypes.array.isRequired,
};
export default RoomObjects;
