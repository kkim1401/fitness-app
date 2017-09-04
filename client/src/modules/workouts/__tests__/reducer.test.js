import reducer, {initialState} from "../reducer";
import * as types from "../actionTypes";
import {MOCK_WORKOUT1} from "../constants";

describe("workouts reducer", () => {
    it("reducer should return initial state if state is undefined and action is unknown.", () => {
        expect(reducer(undefined, {type: "UNKNOWN ACTION"})).toEqual(initialState);
    });

    it("reducer should return state with added workout if received action type is ADD", () => {
        expect(reducer(undefined, {type: types.ADD, workout: MOCK_WORKOUT1})).toEqual({})
    });

    it("reducer should return initial state after performing DELETE", () => {
        expect(reducer(undefined, {type: types.DELETE})).toEqual({});
    });
});
