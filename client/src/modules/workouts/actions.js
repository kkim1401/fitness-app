import {call} from "../../util/apiCaller";
import {v4} from "uuid";
import * as u from "./actionTypes";

export const addWorkout = workout => ({
    type: u.ADD,
    workout
});

export const deleteWorkout = () => ({
    type: u.DELETE
});

export const fetchWorkout = id =>
    dispatch => call("get", `workouts/${id}`)
        .then(({data}) => dispatch(addWorkout(data)));

export const createComponent = () => ({
    type: u.CREATE_COMPONENT,
    id: v4()
});