import { SET_SCENES } from './types';

const initialState = {
    scenes: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SCENES:
            const newScenes = {};
            action.payload.forEach(item => newScenes[item.id] = item)
            return {...state, scenes: newScenes}
        default:
            return state;
    }
};
