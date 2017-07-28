import * as actions from "../actions";
import * as types from "../actionTypes";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import moxios from "moxios";
import {MOCK_EXERCISE1, MOCK_EXERCISE2, MOCK_EXERCISE3, NAME as exercisesNAME} from "../constants";

describe("exercises actions", () => {
    it("should return the action to add an exercise", () => {
        expect(actions.addExercise(MOCK_EXERCISE1))
            .toEqual({type: types.ADD, exercise: MOCK_EXERCISE1});
    });

    it("should return the action to add a list of exercises", () => {
        expect(actions.addExercises([MOCK_EXERCISE1, MOCK_EXERCISE2]))
            .toEqual({type: types.ADD_LIST, exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2]});
    });

    it("should return the action to delete an exercise", () => {
        expect(actions.deleteExercise(MOCK_EXERCISE1._id))
            .toEqual({type: types.DELETE, id: MOCK_EXERCISE1._id});
    });
});

describe("exercises async actions", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const user = 456;

    function assertActions(endpoint, response, action, actionParam, expected) {
        moxios.stubRequest(`/api/${endpoint}`, {
            status: 200,
            response
        });

        const store = mockStore({[exercisesNAME]: []});
        return store.dispatch(action(...actionParam)).then(() => {
            expect(store.getActions()).toEqual([expected]);
        });
    }

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should fetch list of exercises and dispatch action with type ADD_LIST", () => {
        assertActions(
            `${user}/exercises`,
            [MOCK_EXERCISE1, MOCK_EXERCISE3],
            actions.fetchExercises,
            [user],
            {type: types.ADD_LIST, exercises: [MOCK_EXERCISE1, MOCK_EXERCISE3]}
        );
    });

    it("should fetch an exercise and dispatch action with type ADD", () => {
        assertActions(
            `exercises/${MOCK_EXERCISE1._id}`,
            MOCK_EXERCISE1,
            actions.fetchExercise,
            [MOCK_EXERCISE1._id],
            {type: types.ADD, exercise: MOCK_EXERCISE1}
        );
    });

    it("should post an exercise and dispatch action with type ADD", () => {
        assertActions(
            `${user}/exercises`,
            MOCK_EXERCISE1,
            actions.addExerciseRequest,
            [MOCK_EXERCISE1, user],
            {type: types.ADD, exercise: MOCK_EXERCISE1}

        );
    });

    it("should request for deletion of an exercise and dispatch action with type DELETE", () => {
        assertActions(
            `exercises/${MOCK_EXERCISE1._id}`,
            MOCK_EXERCISE1,
            actions.deleteExerciseRequest,
            [MOCK_EXERCISE1._id],
            {type: types.DELETE, id: MOCK_EXERCISE1._id}
        );
    });
});