import {get, post, remove} from "../util/apiCaller";

export const
    ADD_EXERCISE = "ADD_EXERCISE",
    ADD_EXERCISES = "ADD_EXERCISES",
    DELETE_EXERCISE = "DELETE_EXERCISE";

const addExercise = exercise => ({
    type: ADD_EXERCISE,
    exercise
});

const addExercises = exercises => ({
    type: ADD_EXERCISES,
    exercises
});

const deleteExercise = id => ({
    type: DELETE_EXERCISE,
    id
});

export const fetchExercises = user =>
    dispatch => get(`${user}/exercises`)
        .then(({data}) => dispatch(addExercises(data)));

export const fetchExercise = id =>
    dispatch => get(`exercises/${id}`)
        .then(({data}) => dispatch(addExercise(data)));

export const addExerciseRequest = (exercise, user) =>
    dispatch => post(`${user}/exercises`, exercise)
        .then(({data}) => dispatch(addExercise(data)));

export const deleteExerciseRequest = id =>
    dispatch => remove(`exercises/${id}`)
        .then(({data}) => dispatch(deleteExercise(data._id)));

