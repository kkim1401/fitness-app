import * as actions from "../actions";
import * as types from "../actionTypes";
import {assertActions} from "../../../util/testHelper";
import moxios from "moxios";
import {MOCK_WORKOUT1} from "../constants";

describe("workouts actions", () => {
    it("should return action to add a workout", () => {
       expect(actions.addWorkout(MOCK_WORKOUT1))
           .toEqual({type: types.ADD, workout: MOCK_WORKOUT1});
    });

    it("should return action to delete a workout", () => {
        expect(actions.deleteWorkout(MOCK_WORKOUT1))
            .toEqual({type: types.DELETE});
    });
});

describe("workouts async actions", () => {
    const id = 123;

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should fetch workout and dispatch action with type ADD", () => {
        assertActions(
            `workouts/${id}`,
            MOCK_WORKOUT1,
            actions.fetchWorkout,
            [id],
            {type: types.ADD, workout: MOCK_WORKOUT1}
        );
    });
});

describe("workouts AddHOC actions", () => {
    it("should return action to create component and random id", () => {
        const action = actions.createComponent();

        expect(typeof action.id).toBe("string");
        delete action.id;

        expect(action).toEqual({type: types.CREATE_COMPONENT});

    });
});