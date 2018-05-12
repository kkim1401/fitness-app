import { schema } from 'normalizr';

export const exercise = new schema.Entity('exercises', {}, { idAttribute: '_id' });
export const exercises = [exercise];
