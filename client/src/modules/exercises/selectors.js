import get from 'lodash/get';
import { NAME } from './constants';

export const getExercises = state => get(state, [NAME, 'exercisesAllId']);
export const getExerciseById = (state, id) =>
  get(state, [NAME, 'exercisesById', id]);

export const getExerciseId = (state, props) => props.match.params.id;
export const getUserId = (state, props) => props.match.params.user;
