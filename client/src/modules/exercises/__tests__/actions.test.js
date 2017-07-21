import * as actions from "../actions";
import * as types from "../actionTypes";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import nock from "nock";
import {NAME as exerciseNAME} from "../constants";

describe("actions", () => {
    it("should return the action to add an exercise", () => {
        const exercise = "squat";
        const expected = {type: types.ADD, exercise};
        expect(actions.addExercise(exercise)).toEqual(expected);
    });

    it("should return the action to add a list of exercises", () => {
        const exercises = ["squat", "bench"];
        const expected = {type: types.ADD_LIST, exercises};
        expect(actions.addExercises(exercises)).toEqual(expected);
    });

    it("should return the action to delete an exercise", () => {
        const id = 12345;
        const expected = {type: types.DELETE, id};
        expect(actions.deleteExercise(id)).toEqual(expected);
    });
});

describe("async actions", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);


    afterEach(() => {
        nock.cleanAll();
    });

    it("should fetch list of exercises and dispatch action with type ADD_LIST", () => {
        const exercises = ["squat", "bench"];
        const user = "123";
        nock("http://localhost:3001/api")
            .get(`/${user}/exercises`)
            .reply(200, exercises);
        const expectedAction = {type: types.ADD_LIST, exercises};
        const store = mockStore({exerciseNAME: []});
        return store.dispatch(actions.fetchExercises(user)).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
        });
    });
});