import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Scene from 'threejs_scene/lib';
import { useNavigate } from 'react-router';
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import './room.scss';
import { setModalProps } from '../../redux_stores/modalsReducer/actions';
import RoomObjects from './RoomObjects';

const Room = ({ sceneData }) => {
	const [roomObjects, setRoomObjects] = useState([]);
	const [linkedScenes, setLinkedScenes] = useState([]);
	const scenes = useSelector((state) => state.scenes);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const sendAnalyticsEvent = useSelector(
		(state) => state.shareableFunctions.sendAnalyticsEvent,
	);

	useEffect(() => {
		getSceneObjects(sceneData.id)
			.then((res) => {
				setRoomObjects(res);
				setLinkedScenes(
					res
						.filter((item) => item.type === 'NavMarker')
						.map((item) => scenes[item?.props?.linked_room_id.$oid])
						.filter((item) => 'cube_map_dir' in item)
						.map((item) => formURL(item.cube_map_dir)),
				);
			})
			.catch(() => {
				setRoomObjects([]);
				setLinkedScenes([]);
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

		sendAnalyticsEvent({
			eventCategory: 'Navigation',
			eventAction: 'Arrow clicked',
			eventLabel: scenes[sceneData.id].name,
		});
	};

	const onLinkMarkerClicked = (data) => {
		const linkUrl = formURL(data.url);
		window.open(linkUrl, '_blank');

		sendAnalyticsEvent({
			eventCategory: 'Content',
			eventAction: 'Link',
			eventLabel: linkUrl,
		});
	};

	const onSoundMarkerClicked = (data) => {
		// this needs work
		const audioFile = formURL(data.url);
		// const audio = new Audio(audioFile);
		// audio.play();

		sendAnalyticsEvent({
			eventCategory: 'Content',
			eventAction: 'Sound',
			eventLabel: audioFile,
		});
	};

	const onHotspotMarkerClicked = (data) => {
		switch (data.hotspot_type) {
			case 'link':
				onLinkMarkerClicked(data);
				break;
			case 'sound':
				onSoundMarkerClicked(data);
				break;
			case 'custom':
				dispatch(
					setModalProps(data.selector, { ...data, visible: true }),
				);
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
			linkedScenes={linkedScenes}
			allowHotspotsToMove={false}
			onMouseUp={(e, sceneObject, marker, isDragEvent) =>
				onSceneMouseUp(e, sceneObject, marker, isDragEvent)
			}
		>
			<RoomObjects roomObjects={roomObjects} />
		</Scene>
	);
};

Room.propTypes = {
	sceneData: PropTypes.object.isRequired,
};
export default Room;
