import axios from 'axios';
import toLower from 'lodash/toLower';

export function call(method, endpoint, data) {
  return axios({
    method: toLower(method),
    url: `/api/${endpoint}`,
    ...(data ? { data } : {}),
  })
    .then(res => res)
    .catch(err => err);
}
