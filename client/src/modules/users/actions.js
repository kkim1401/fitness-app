import {get, post, remove} from "../../util/apiCaller";
import * as u from "./actionTypes";

export const addUser = user => ({
    type: u.ADD,
    user
});

const deleteUser = user => ({
    type: u.DELETE,
    user
});

export const fetchUser = id =>
    dispatch => get(`users/${id}`)
        .then(({data}) => dispatch(addUser(data)));

export const updateUserDetails = (id, user) =>
    dispatch => post(`users/update/${id}`, user)
        .then(({data}) => dispatch(addUser(data)));

export const addUserRequest = user =>
    dispatch => post(`users`, user)
        .then(({data}) => dispatch(addUser(data)))
        .then(console.log("success!"));

export const deleteUserRequest = id =>
    dispatch => remove(`users/${id}`)
        .then(({data}) => dispatch(deleteUser(data)));

