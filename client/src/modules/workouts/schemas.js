import { schema } from 'normalizr';
import exercises from '../exercises';

const { schemas } = exercises.schemas;

export const workout = new schema.Entity('workouts', {
  schedule: [{
    exerciseList: [{
      exercise: schemas.exercise,
    }],
  }],
}, { idAttribute: '_id' });

export const workouts = [workout];
