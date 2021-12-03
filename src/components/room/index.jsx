import React, { useState, useEffect } from 'obsess_libs/react';
import { connect } from 'obsess_libs/react-redux';

import "./room.scss";
import { formURL } from '../../utils/apiUtils';
import { getSceneObjects } from '../../apis/webStoreAPI';
import Button from 'obsess_modules/Button';
import Scene, {Hotspot} from 'obsess_libs/threejs-scene';
import { useNavigate } from 'obsess_libs/react-router';

const Room = ({sceneId, sceneData, scenes}) => {
    const [roomObjects, setRoomObjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSceneObjects(sceneId).then(res => setRoomObjects(res))
    }, [sceneId])

    const url = sceneData?.cube_map_dir || sceneData?.flat_scene_url;
    const bgConfig = {
        isFlatScene: !!sceneData.flat_scene_url,
        backgroundUrl: formURL(url),
    }

    const onNavMarkerClicked = (data) => {
        navigate(`/${scenes[data.linked_room_id.$oid].name}`)
    }

    const onHotspotMarkerClicked = (data) => {
        console.log("=> onHotspotMarkerClicked", data);
    }

    const onSceneMouseUp = (e, sceneObject, marker, isDragEvent) => {
        console.log("=> onSceneMouseUp", marker)
        if (marker) {
            const { type, props } = marker.userData;
            if (type === "NavMarker") {
                onNavMarkerClicked(props);
            }else if (type === "HotspotMarker") {
                onHotspotMarkerClicked(props)
            }
        }
    }

    return (
        <div>
            <Scene
                sceneId={sceneId}
                bgConf={bgConfig}
                allowHotspotsToMove={false}
                onMouseUp={(e, sceneObject, marker, isDragEvent) => onSceneMouseUp(e, sceneObject, marker, isDragEvent)}
            >
                {roomObjects.map((item, i) => <Hotspot
                    key={item._id.$oid}
                    type='hotspot'
                    collider_transform={item.collider_transform}
                    transform={item.transform}
                    iconConfig={{dotColor:'black'}}
                    imageURL={item.type === "NavMarker" ? "https://obsessvr-webstore-assets-public.s3.amazonaws.com/arrow.svg" : null}
                    userData={{ props: item?.props || {}, type: item.type }}
                />)}
            </Scene>

            <div className={'topUILayer'}>
                <Button onClick={() => console.log("=> clicked")}/>
            </div>

        </div>
    );
}

const mapStateToProps = ({app}) => ({
    scenes: app.scenes
});

export default connect(mapStateToProps, {})(Room);
