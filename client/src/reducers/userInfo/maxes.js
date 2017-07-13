import {ADD_USER, DELETE_USER} from "../../actions/userActions";

const initialState = {
    squat: 0,
    bench: 0,
    deadlift: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {...state, ...action.user.maxes};
        case DELETE_USER:
            return initialState;
        default:
            return state;
    }
};

