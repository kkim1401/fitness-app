import {call} from "../../util/apiCaller";
import * as e from "./actionTypes";

export const addExercise = exercise => ({
    type: e.ADD,
    exercise
});

export const addExercises = exercises => ({
    type: e.ADD_LIST,
    exercises
});

export const deleteExercise = id => ({
    type: e.DELETE,
    id
});

export const fetchExercises = user =>
    dispatch => call("get", `users/${user}/exercises`)
        .then(({data}) => dispatch(addExercises(data)));

export const fetchExercise = (user, id) =>
    dispatch => call("get", `users/${user}/exercises/${id}`)
        .then(({data}) => dispatch(addExercise(data)));

export const addExerciseRequest = (user, exercise) =>
    dispatch => call("post", `users/${user}/exercises`, exercise)
        .then(({data}) => dispatch(addExercise(data)));

export const deleteExerciseRequest = (user, id) =>
    dispatch => call("delete", `users/${user}/exercises/${id}`)
        .then(() => dispatch(deleteExercise(id)));

