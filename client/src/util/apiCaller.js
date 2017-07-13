import axios from "axios";

export function get(endpoint) {
    return axios.get(`/api/${endpoint}`)
        .then(res => res)
        .catch(err => err);
}

export function post(endpoint, data) {
    return axios.post(`/api/${endpoint}`, data)
        .then(res => res)
        .catch(err => err);
}

export function remove(endpoint) {
    return axios.delete(`/api/${endpoint}`)
        .then(res => res)
        .catch(err => err)
}

