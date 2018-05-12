import * as actions from '../actions';
import * as types from '../actionTypes';
import { assertActions } from '../../../util/testHelper';
import moxios from 'moxios';
import { MOCK_WORKOUT1 } from '../constants';

describe('workouts async actions', () => {
  const userId = 123;
  const workoutId = 456;

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch workout and dispatch action', () => {
    assertActions(
      `workouts/${workoutId}`,
      MOCK_WORKOUT1,
      actions.fetchWorkout,
      [userId, workoutId],
      [{ type: types.FETCH_WORKOUT_REQUEST }, { type: types.FETCH_WORKOUT_SUCCESS, workout: MOCK_WORKOUT1 }],
    );
  });

  it('should post workout and dispatch action', () => {
    assertActions(
      `users/${userId}/workouts`,
      MOCK_WORKOUT1,
      actions.postWorkout,
      [userId, workoutId, MOCK_WORKOUT1],
      [{ type: types.POST_WORKOUT_REQUEST }, { type: types.POST_WORKOUT_SUCCESS, workout: MOCK_WORKOUT1 }],
    );
  });
});
