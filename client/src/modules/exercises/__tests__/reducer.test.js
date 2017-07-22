import reducer from "../reducer";
import * as types from "../actionTypes";

describe("exercises reducer", () => {
    const exercise1 = {name: "squat", description: "leg exercise", _id: 123},
        exercise2 = {name: "bench", description: "chest exercise", _id: 456},
        exercise3 = {name: "deadlift", description: "back exercise", _id: 789};

    it("should return initial state as empty array", () => {
        const expected = [];

        expect(reducer(undefined, {})).toEqual(expected);
    });

    it("should return state with added exercise when performing ADD", () => {
        const expected1 = [exercise1],
            expected2 = [exercise1, exercise2],
            action1 = {type: types.ADD, exercise: exercise1},
            action2 = {type: types.ADD, exercise: exercise2};

        expect(reducer(undefined, action1)).toEqual(expected1);
        expect(reducer([exercise1], action2)).toEqual(expected2);
    });

    it("should return a new list of exercises for state when performing ADD_LIST", () => {
        const expected1 = [exercise1],
            expected2 = [exercise1, exercise3],
            action1 = {type: types.ADD_LIST, exercises: [exercise1]},
            action2 = {type: types.ADD_LIST, exercises: [exercise1, exercise3]};

        expect(reducer(undefined, action1)).toEqual(expected1);
        expect(reducer([exercise2], action2)).toEqual(expected2);
    });

    it("should return new, filtered state after performing DELETE", () => {
        const expected1 = [],
            expected2 = [exercise1, exercise3],
            action1 = {type: types.DELETE, id: exercise1._id},
            action2 = {type: types.DELETE, id: exercise2._id};

        expect(reducer(undefined, action1)).toEqual(expected1);
        expect(reducer([exercise1, exercise2, exercise3], action2)).toEqual(expected2);
    });

    it("should simply return state when presented with unknown action type", () => {
        const expected = [exercise1, exercise3],
            action = {type: "UNKNOWN_ACTION", exercise: exercise1};

        expect(reducer([exercise1, exercise3], action)).toEqual(expected);
    });
});