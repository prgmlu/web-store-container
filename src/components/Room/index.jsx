import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Scene, { Hotspot } from 'threejs_scene/lib';
import { useNavigate } from 'react-router';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import Layout from '../Layout';
import './room.scss';

const Room = function ({ sceneId, sceneData, scenes }) {
	const [roomObjects, setRoomObjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getSceneObjects(sceneId).then((res) => setRoomObjects(res));
	}, [sceneId]);

	const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;
	const bgConfig = {
		isFlatScene: !!sceneData.flat_scene_url,
		backgroundUrl: formURL(url),
	};

	const onNavMarkerClicked = (data) => {
		navigate(`/${scenes[data.linked_room_id.$oid].name}`);
	};
	const onHotspotMarkerClicked = (data) => {
		console.log('=> onHotspotMarkerClicked', data);
	};

	const onSceneMouseUp = (e, sceneObject, marker, isDragEvent) => {
		console.log('=> onSceneMouseUp', marker);
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
				sceneId={sceneId}
				bgConf={bgConfig}
				allowHotspotsToMove={false}
				onMouseUp={(e, sceneObject, marker, isDragEvent) =>
					onSceneMouseUp(e, sceneObject, marker, isDragEvent)
				}
			>
				{roomObjects.map((item, i) => (
					<Hotspot
						key={item._id.$oid}
						type='hotspot'
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

export default connect(mapStateToProps, {})(Room);
