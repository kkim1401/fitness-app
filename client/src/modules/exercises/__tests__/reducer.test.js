import reducer from "../reducer";
import * as types from "../actionTypes";
import {MOCK_EXERCISE1, MOCK_EXERCISE2, MOCK_EXERCISE3} from "../constants";

describe("exercises reducer", () => {
    it("should return initial state as empty array", () => {
        expect(reducer(undefined, {})).toEqual([]);
    });

    it("should return state with added exercise after performing ADD", () => {
        expect(reducer(undefined, {type: types.ADD, exercise: MOCK_EXERCISE1}))
            .toEqual([MOCK_EXERCISE1]);
        expect(reducer([MOCK_EXERCISE1], {type: types.ADD, exercise: MOCK_EXERCISE2}))
            .toEqual([MOCK_EXERCISE1, MOCK_EXERCISE2]);
    });

    it("should return a new list of exercises for state after performing ADD_LIST", () => {
        expect(reducer(undefined, {type: types.ADD_LIST, exercises: [MOCK_EXERCISE1]}))
            .toEqual([MOCK_EXERCISE1]);
        expect(reducer([MOCK_EXERCISE2], {type: types.ADD_LIST, exercises: [MOCK_EXERCISE1, MOCK_EXERCISE3]}))
            .toEqual([MOCK_EXERCISE1, MOCK_EXERCISE3]);
    });

    it("should return new, filtered state after performing DELETE", () => {
        expect(reducer(undefined, {type: types.DELETE, id: MOCK_EXERCISE1._id}))
            .toEqual([]);
        expect(reducer([MOCK_EXERCISE1, MOCK_EXERCISE2, MOCK_EXERCISE3], {type: types.DELETE, id: MOCK_EXERCISE2._id}))
            .toEqual([MOCK_EXERCISE1, MOCK_EXERCISE3]);
    });

    it("should simply return state when presented with unknown action type", () => {
        expect(reducer([MOCK_EXERCISE1, MOCK_EXERCISE3], {type: "UNKNOWN_ACTION", exercise: [MOCK_EXERCISE1]}))
            .toEqual([MOCK_EXERCISE1, MOCK_EXERCISE3]);
    });
});