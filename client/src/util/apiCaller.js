import axios from "axios";

export function call(method, endpoint, data) {
    return axios({
        method,
        url: `/api/${endpoint}`,
        ...(data ? {data} : {})
    })
        .then(res => res)
        .catch(err => err);
}