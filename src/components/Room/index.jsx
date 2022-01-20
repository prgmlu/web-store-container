import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene, { Hotspot } from 'threejs_scene/lib';
import { useNavigate } from 'react-router';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import './room.scss';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';

const Room = ({ sceneData }) => {
	const [roomObjects, setRoomObjects] = useState([]);
	const scenes = useSelector((state) => state.scenes);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		getSceneObjects(sceneData.id).then((res) => {
			setRoomObjects(res);
		});
	}, [sceneData.id]);

	const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;
	const bgConfig = {
		isFlatScene: !!sceneData.flat_scene_url,
		backgroundUrl: formURL(url),
	};

	const onNavMarkerClicked = (data) => {
		setRoomObjects([]);
		navigate(`/${scenes[data.linked_room_id.$oid].name}`);
	};

	const onHotspotMarkerClicked = (data) => {
		dispatch(
			setModalProps(data.hotspot_type, {
				...data,
				visible: true,
			}),
		);
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

	// Note: If you are trying to find why the entire UI lods twice initially, it is here.
	// Layout is rendered twice causing all the other elements to re-render.
	return (
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
	);
};

Room.propTypes = {
	sceneData: PropTypes.object.isRequired,
};
export default Room;
