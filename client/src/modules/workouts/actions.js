import { NAME } from './constants';
import * as schemas from './schemas';
import { CALL_API } from '../../middleware/api';

export const ADD_WORKOUT_REQUEST = `${NAME}/ADD_WORKOUT_REQUEST`;
export const ADD_WORKOUT_SUCCESS = `${NAME}/ADD_WORKOUT_SUCCESS`;
export const ADD_WORKOUT_FAILURE = `${NAME}/ADD_WORKOUT_FAILURE`;

export const ADD_WORKOUTS_REQUEST = `${NAME}/ADD_WORKOUTS_REQUEST`;
export const ADD_WORKOUTS_SUCCESS = `${NAME}/ADD_WORKOUTS_SUCCESS`;
export const ADD_WORKOUTS_FAILURE = `${NAME}/ADD_WORKOUTS_FAILURE`;

export const DELETE_WORKOUT_REQUEST = `${NAME}/DELETE_WORKOUT_REQUEST`;
export const DELETE_WORKOUT_SUCCESS = `${NAME}/DELETE_WORKOUT_SUCCESS`;
export const DELETE_WORKOUT_FAILURE = `${NAME}/DELETE_WORKOUT_FAILURE`;

export const fetchWorkouts = user => ({
  [CALL_API]: {
    endpoint: `users/${user}/workouts`,
    request: 'get',
    schema: schemas.workouts,
    types: [ADD_WORKOUTS_REQUEST, ADD_WORKOUTS_SUCCESS, ADD_WORKOUTS_FAILURE],
  },
});

export const fetchWorkout = id => ({
  [CALL_API]: {
    endpoint: `workouts/${id}`,
    request: 'get',
    types: [ADD_WORKOUT_REQUEST, ADD_WORKOUT_SUCCESS, ADD_WORKOUT_FAILURE],
  },
});

export const addWorkout = (user, workout) => ({
  [CALL_API]: {
    data: workout,
    endpoint: `users/${user}/workout`,
    request: 'post',
    schema: schemas.workout,
    types: [ADD_WORKOUT_REQUEST, ADD_WORKOUT_SUCCESS, ADD_WORKOUT_FAILURE],
  },
});

export const deleteWorkout = id => ({
  [CALL_API]: {
    endpoint: `workouts/${id}`,
    request: 'delete',
    types: [DELETE_WORKOUT_REQUEST, DELETE_WORKOUT_SUCCESS, DELETE_WORKOUT_FAILURE],
  },
  id,
});
