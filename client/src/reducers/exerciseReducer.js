import {ADD_EXERCISE, ADD_EXERCISES, DELETE_EXERCISE} from "../actions/exerciseActions";

const exercises = (state = [], action) => {
    switch (action.type) {
        case ADD_EXERCISE:
            return [...state, action.exercise];
        case ADD_EXERCISES:
            return action.exercises;
        case DELETE_EXERCISE:
            return state.filter(exercise => exercise._id !== action.id);
        default:
            return state;
    }
};


export const getExercises = state => state.exercises;

export const getExercise = (state, id) => state.exercises.filter(exercise => exercise._id === id)[0];

export default exercises;