import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './modules/users';
import exercises from './modules/exercises';

const workoutApp = combineReducers({
  [users.constants.NAME]: users.reducer,
  [exercises.constants.NAME]: exercises.reducer,
  form: formReducer,
});

export default workoutApp;

