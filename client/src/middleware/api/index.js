import _ from 'lodash';
import { normalize } from 'normalizr';
import { call } from './api-caller';

export const CALL_API = 'CALL_API';

export default store => next => (action) => {
  const callApi = action[CALL_API];

  if (typeof callApi === 'undefined') {
    return next(action);
  }

  const {
    data = {},
    endpoint,
    request,
    schema = null,
    types,
  } = callApi;

  if (!_.isArray(types) || types.length !== 3) {
    throw new Error('Expected array of three types');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Expected endpoint');
  }

  if (typeof request !== 'string') {
    throw new Error('Expected request');
  }

  const getActionWith = (props) => {
    const newAction = {
      ...action,
      ...props,
    };
    delete newAction[CALL_API];
    return newAction;
  };

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ type: REQUEST });

  return call(request, endpoint, data)
    .then(({ data: responseData }) => next(getActionWith({
      type: SUCCESS,
      ...(schema ? {
        payload: normalize(responseData, schema),
      } : {}),
    })))
    .catch(error => next(getActionWith({
      error,
      type: FAILURE,
    })));
};
