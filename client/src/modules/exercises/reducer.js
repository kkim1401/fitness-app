import * as e from "./actionTypes";

const exercises = (state = [], action) => {
    switch (action.type) {
        case e.ADD:
            return [...state, action.exercise];
        case e.ADD_LIST:
            return action.exercises;
        case e.DELETE:
            return state.filter(exercise => exercise._id !== action.id);
        default:
            return state;
    }
};

export default exercises;