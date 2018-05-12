import _ from 'lodash';
import { combineReducers } from 'redux';
import { ADD_EXERCISE_SUCCESS, ADD_EXERCISES_SUCCESS, DELETE_EXERCISE_SUCCESS }
  from './actions';

const exercisesById = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXERCISE_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.exercises,
      };
    case ADD_EXERCISES_SUCCESS:
      return _.get(action, 'payload.entities.exercises', {});
    case DELETE_EXERCISE_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

const exercisesAllId = (state = [], action) => {
  switch (action.type) {
    case ADD_EXERCISE_SUCCESS:
      return [
        ...state,
        action.payload.result,
      ];
    case ADD_EXERCISES_SUCCESS:
      return action.payload.result;
    case DELETE_EXERCISE_SUCCESS:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  exercisesById,
  exercisesAllId,
});
