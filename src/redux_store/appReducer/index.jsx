import { SET_SCENES } from './types';

const initialState = {
    scenes: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SCENES:
            return {...state, scenes: action.payload}
        default:
            return state;
    }
};
