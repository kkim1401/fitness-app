import {call} from "../../util/apiCaller";
import * as u from "./actionTypes";

export const addUser = user => ({
    type: u.ADD,
    user
});

export const deleteUser = () => ({
    type: u.DELETE
});

export const fetchUser = id =>
    dispatch => call("get", `users/${id}`)
        .then(({data}) => dispatch(addUser(data)));

export const updateUserDetails = (id, user) =>
    dispatch => call("patch", `users/${id}`, user)
        .then(({data}) => dispatch(addUser(data)));

export const addUserRequest = user =>
    dispatch => call("post", "users", user)
        .then(({data}) => dispatch(addUser(data)));

export const deleteUserRequest = id =>
    dispatch => call("delete", `users/${id}`)
        .then(() => dispatch(deleteUser()));

