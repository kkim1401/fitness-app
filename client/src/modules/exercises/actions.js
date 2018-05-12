import { NAME } from './constants';
import * as schemas from './schemas';
import { CALL_API } from '../../middleware/api';

export const ADD_EXERCISE_REQUEST = `${NAME}/ADD_EXERCISE_REQUEST`;
export const ADD_EXERCISE_SUCCESS = `${NAME}/ADD_EXERCISE_SUCCESS`;
export const ADD_EXERCISE_FAILURE = `${NAME}/ADD_EXERCISE_FAILURE`;

export const ADD_EXERCISES_REQUEST = `${NAME}/ADD_EXERCISES_REQUEST`;
export const ADD_EXERCISES_SUCCESS = `${NAME}/ADD_EXERCISES_SUCCESS`;
export const ADD_EXERCISES_FAILURE = `${NAME}/ADD_EXERCISES_FAILURE`;

export const DELETE_EXERCISE_REQUEST = `${NAME}/DELETE_EXERCISE_REQUEST`;
export const DELETE_EXERCISE_SUCCESS = `${NAME}/DELETE_EXERCISE_SUCCESS`;
export const DELETE_EXERCISE_FAILURE = `${NAME}/DELETE_EXERCISE_FAILURE`;

export const fetchExercises = user => ({
  [CALL_API]: {
    endpoint: `users/${user}/exercises`,
    request: 'get',
    schema: schemas.exercises,
    types: [ADD_EXERCISES_REQUEST, ADD_EXERCISES_SUCCESS, ADD_EXERCISES_FAILURE],
  },
});

export const addExercise = (user, exercise) => ({
  [CALL_API]: {
    data: exercise,
    endpoint: `users/${user}/exercises`,
    request: 'post',
    schema: schemas.exercise,
    types: [ADD_EXERCISE_REQUEST, ADD_EXERCISE_SUCCESS, ADD_EXERCISE_FAILURE],
  },
});

export const deleteExercise = id => ({
  [CALL_API]: {
    endpoint: `exercises/${id}`,
    request: 'delete',
    types: [DELETE_EXERCISE_REQUEST, DELETE_EXERCISE_SUCCESS, DELETE_EXERCISE_FAILURE],
  },
  id,
});
