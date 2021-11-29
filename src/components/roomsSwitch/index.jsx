import React, {Component} from 'obsess_libs/react';
import {
    Routes,
    Route,
} from "obsess_libs/react-router";
import { getAllScenes } from '../../apis/webStoreAPI';
import { connect } from 'obsess_libs/react-redux';
import Room from '../room';

class RoomsSwitch extends Component {
    componentDidMount() {
        this.props.getAllScenes()
    }

    render() {
        return (
            <Routes>
                {this.props.scenes.map(scene =>
                    {
                        return (
                            <Route
                                key={scene?.id}
                                path={scene?.name==="entrance" ? "/" : scene.name}
                                element={<Room scene={scene}/>}
                            />
                        )
                    }
                )}
            </Routes>
        )
    }
}

const mapStateToProps = ({app}) => ({
    scenes: app.scenes
});


const mapDispatchToProps = {
    getAllScenes
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomsSwitch);
