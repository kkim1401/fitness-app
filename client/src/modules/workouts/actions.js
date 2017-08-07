import {get, post, remove} from "../../util/apiCaller";
import * as u from "./actionTypes";

export const addWorkout = workout => ({
    type: u.ADD,
    workout
});

export const deleteWorkout = () => ({
    type: u.DELETE
});

export const fetchWorkout = id =>
    dispatch => get(`workouts/${id}`)
        .then(({data}) => dispatch(addWorkout(data)));
