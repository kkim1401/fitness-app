import {call} from "../../util/apiCaller";
import * as u from "./actionTypes";

export const fetchWorkout = (user, id) => (dispatch, getState) => {
    dispatch({type: u.FETCH_WORKOUT_REQUEST});

    return call("get", `workouts/${id}`).then(
            ({data}) =>
                dispatch({
                    type: u.FETCH_WORKOUT_SUCCESS,
                    workout: data
                }),
            error =>
                dispatch({
                    type: u.FETCH_WORKOUT_FAILURE,
                    error
            })
    );
};

export const postWorkout = (user, id, workout) => dispatch => {
    dispatch({type: u.POST_WORKOUT_REQUEST});

    return call("post", `users/${user}/workouts`, workout).then(
        ({data}) =>
            dispatch({
                type: u.POST_WORKOUT_SUCCESS,
                workout: data
            }),
        error =>
            dispatch({
                type: u.POST_WORKOUT_FAILURE,
                error
        })
    );
};