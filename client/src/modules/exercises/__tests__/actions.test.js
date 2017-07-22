import * as actions from "../actions";
import * as types from "../actionTypes";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {NAME as exerciseNAME} from "../constants";
import moxios from "moxios";

const exercise = {name: "squat", description: "leg exercise", _id: 123},
    exercises = [exercise, {name: "bench", description: "chest exercise", _id: 222}],
    id = exercise._id,
    user = 456;

describe("exercises actions", () => {
    it("should return the action to add an exercise", () => {
        const expected = {type: types.ADD, exercise};

        expect(actions.addExercise(exercise)).toEqual(expected);
    });

    it("should return the action to add a list of exercises", () => {
        const expected = {type: types.ADD_LIST, exercises};

        expect(actions.addExercises(exercises)).toEqual(expected);
    });

    it("should return the action to delete an exercise", () => {
        const expected = {type: types.DELETE, id};

        expect(actions.deleteExercise(id)).toEqual(expected);
    });
});

describe("exercises async actions", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should fetch list of exercises and dispatch action with type ADD_LIST", () => {
        const expectedAction = {type: types.ADD_LIST, exercises};

       moxios.stubRequest(`/api/${user}/exercises`, {
            status: 200,
            response: exercises
        });

        const store = mockStore({exerciseNAME: []});
        return store.dispatch(actions.fetchExercises(user)).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
        });
    });

    it("should fetch an exercise and dispatch action with type ADD", () => {
        const expectedAction = {type: types.ADD, exercise};

        moxios.stubRequest(`/api/exercises/${id}`, {
            status: 200,
            response: exercise
        });

        const store = mockStore({exerciseNAME: []});
        return store.dispatch(actions.fetchExercise(id)).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
        });
    });

    it("should request for an exercise and dispatch action with type ADD", () => {
        const expectedAction = {type: types.ADD, exercise};

        moxios.stubRequest(`/api/${user}/exercises`, {
            status: 200,
            response: exercise
        });

        const store = mockStore({exerciseNAME: []});
        return store.dispatch(actions.addExerciseRequest(exercise, user)).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
        });
    });

    it("should request for deletion of an exercise and dispatch action with type DELETE", () => {
        const expectedAction = {type: types.DELETE, id};

        moxios.stubRequest(`/api/exercises/${id}`, {
            status: 200,
            response: exercise
        });

        const store = mockStore({exerciseNAME: []});
        return store.dispatch(actions.deleteExerciseRequest(id)).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
        });
    });
});