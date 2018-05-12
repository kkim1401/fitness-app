import reducer from '../reducer';
import * as types from '../actionTypes';
import { MOCK_USER1, MOCK_USER2 } from '../constants';

describe('users reducer,', () => {
  it('should return initial state based on defaults of slices', () => {
    expect(reducer(undefined, {})).toEqual({
      name: '',
      age: 0,
      gender: '',
      maxes: {
        squat: 0,
        bench: 0,
        deadlift: 0,
      },
      id: 0,
    });
  });

  it("should return state with new user's info after performing ADD", () => {
    expect(reducer(undefined, { type: types.ADD, user: MOCK_USER1 }))
      .toEqual({
        name: 'Kevin',
        age: 24,
        gender: 'male',
        maxes: {
          squat: 365,
          bench: 255,
          deadlift: 505,
        },
        id: 123,
      });

    expect(reducer({
      name: 'Kevin',
      age: 24,
      gender: 'male',
      maxes: {
        squat: 365,
        bench: 255,
        deadlift: 505,
      },
      id: 123,
    }, { type: types.ADD, user: MOCK_USER2 })).toEqual({
      name: 'Nick',
      age: 24,
      gender: 'male',
      maxes: {
        squat: 495,
        bench: 275,
        deadlift: 545,
      },
      id: 456,
    });
  });

  it('should return initial state after performing DELETE', () => {
    expect(reducer(undefined, { type: types.DELETE })).toEqual({
      name: '',
      age: 0,
      gender: '',
      maxes: {
        squat: 0,
        bench: 0,
        deadlift: 0,
      },
      id: 0,
    });

    expect(reducer({
      name: 'Nick',
      age: 24,
      gender: 'male',
      maxes: {
        squat: 495,
        bench: 275,
        deadlift: 545,
      },
      id: 456,
    }, { type: types.DELETE })).toEqual({
      name: '',
      age: 0,
      gender: '',
      maxes: {
        squat: 0,
        bench: 0,
        deadlift: 0,
      },
      id: 0,
    });
  });

  it('should return state when presented with unknown action', () => {
    expect(reducer({
      name: 'Nick',
      age: 24,
      gender: 'male',
      maxes: {
        squat: 495,
        bench: 275,
        deadlift: 545,
      },
      id: 456,
    }, { type: 'UNKNOWN_ACTION' })).toEqual({
      name: 'Nick',
      age: 24,
      gender: 'male',
      maxes: {
        squat: 495,
        bench: 275,
        deadlift: 545,
      },
      id: 456,
    });
  });
});
