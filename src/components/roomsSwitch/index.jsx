import React, {useEffect} from 'obsess_libs/react';
import {Routes, Route,} from "obsess_libs/react-router";
import { getAllScenes } from '../../apis/webStoreAPI';
import Room from '../Room';
import { connect, useDispatch } from 'obsess_libs/react-redux';

const RoomsSwitch = ({ scenes }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllScenes());
    }, [])

    return (
        <Routes basename={'/'}>
            {Object.keys(scenes).map(sceneId => {
                    const scene = scenes[sceneId]
                    return (<Route
                        key={scene?.id}
                        path={scene?.name === "entrance" ? "/" : scene.name}
                        element={<Room sceneData={scene} sceneId={scene.id}/>}
                    />)
                }
            )}
        </Routes>
    )
};

const mapStateToProps = ({app}) => ({
    scenes: app.scenes
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSwitch);
