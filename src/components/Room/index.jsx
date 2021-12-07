import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene, { Hotspot } from 'threejs_scene/lib';
import { useNavigate } from 'react-router';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import Layout from '../Layout';
import './room.scss';

const Room = ({ sceneData, scenes }) => {
	const [roomObjects, setRoomObjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getSceneObjects(sceneData.id).then((res) => setRoomObjects(res));
	}, [sceneData.id]);

	const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;
	const bgConfig = {
		isFlatScene: !!sceneData.flat_scene_url,
		backgroundUrl: formURL(url),
	};

	const onNavMarkerClicked = (data) => {
		navigate(`/${scenes[data.linked_room_id.$oid].name}`);
	};
	const onHotspotMarkerClicked = (data) => {
		// eslint-disable-next-line no-console
		console.log('=> onHotspotMarkerClicked', data);
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

	return (
		<Layout>
			<Scene
				sceneId={sceneData.id}
				bgConf={bgConfig}
				allowHotspotsToMove={false}
				onMouseUp={(e, sceneObject, marker, isDragEvent) =>
					onSceneMouseUp(e, sceneObject, marker, isDragEvent)
				}
			>
				{roomObjects.map((item) => (
					<Hotspot
						key={item._id.$oid}
						type="hotspot"
						collider_transform={item.collider_transform}
						transform={item.transform}
						iconConfig={{ dotColor: 'black' }}
						imageURL={
							item.type === 'NavMarker'
								? 'https://obsessvr-webstore-assets-public.s3.amazonaws.com/arrow.svg'
								: null
						}
						userData={{
							props: item?.props || {},
							type: item.type,
						}}
					/>
				))}
			</Scene>
		</Layout>
	);
};

const mapStateToProps = ({ app }) => ({
	scenes: app.scenes,
});

Room.propTypes = {
	sceneData: PropTypes.object.isRequired,
	scenes: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, {})(Room);
