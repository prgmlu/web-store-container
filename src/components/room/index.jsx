import React, {Component} from 'obsess_libs/react';
import { connect } from 'obsess_libs/react-redux';

import Scene from 'obsess_libs/threejs-scene';
import "./room.scss";

const bgConfig ={
    isFlatScene: true,
    backgroundUrl: 'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Mary_Kay/610dabc09ed97ea76b08dfd5/images/flat/mk-entrance-oct8.jpg'
}

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
    }


    componentDidMount() {
        this.setState({
            mounted: true
        })
    }


    render() {
        return (
            <>
                {this.state.mounted && <Scene sceneId={this.props.scene.id} bgConfig={bgConfig}/>}
            </>
        );
    }
}
const mapStateToProps = ({app}) => ({
    scenes: app.scenes
});

export default connect(mapStateToProps, {})(Room);
