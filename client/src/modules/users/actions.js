import {get, post, remove} from "../../util/apiCaller";
import * as u from "./actionTypes";

export const addUser = user => ({
    type: u.ADD,
    user
});

export const deleteUser = () => ({
    type: u.DELETE
});

export const fetchUser = id =>
    dispatch => get(`users/${id}`)
        .then(({data}) => dispatch(addUser(data)));

export const updateUserDetails = (id, user) =>
    dispatch => post(`users/update/${id}`, user)
        .then(({data}) => dispatch(addUser(data)));

export const addUserRequest = user =>
    dispatch => post(`users`, user)
        .then(({data}) => dispatch(addUser(data)));

export const deleteUserRequest = id =>
    dispatch => remove(`users/${id}`)
        .then(() => dispatch(deleteUser()));

