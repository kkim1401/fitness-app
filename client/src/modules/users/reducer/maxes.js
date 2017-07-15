import * as u from "../actionTypes";

const initialState = {
    squat: 0,
    bench: 0,
    deadlift: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case u.ADD:
            return {...state, ...action.user.maxes};
        case u.DELETE:
            return initialState;
        default:
            return state;
    }
};

