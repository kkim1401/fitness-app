import {createSelector} from "reselect";

export const getExercises = state => state.exercises;
export const getExerciseId = (state, props) => props.match.params.id;
export const getUserId = (state, props) => props.match.params.user;

export const getExercise = createSelector(
    [getExercises, getExerciseId],
    (exercises, id) => ({exercise: exercises.filter(exercise => exercise._id === id)[0]})
);