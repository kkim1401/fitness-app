import * as actions from "../actions";
import * as types from "../actionTypes";
import {assertActions} from "../../../util/testHelper";
import moxios from "moxios";
import {MOCK_USER1, MOCK_USER2} from "../constants";


describe("users actions", () => {
    it("should return the action to add a user", () => {
        expect(actions.addUser(MOCK_USER1))
            .toEqual({type: types.ADD, user: MOCK_USER1});
    });

    it("should return the action to delete a user", () => {
        expect(actions.deleteUser())
            .toEqual({type: types.DELETE});
    });
});

describe("users async actions", () => {
    const id = 123;

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should fetch user's info and dispatch action with type ADD", () => {
        assertActions(
            `users/${id}`,
            MOCK_USER1,
            actions.fetchUser,
            [id],
            {type: types.ADD, user: MOCK_USER1}
        );
    });

    it("should update user's details and dispatch action with type ADD", () => {
        assertActions(
            `users/update/${id}`,
            MOCK_USER2,
            actions.updateUserDetails,
            [id, MOCK_USER2],
            {type: types.ADD, user: MOCK_USER2}
        );
    });

    it("should request to add user and dispatch action with type ADD", () => {
        assertActions(
            `users`,
            MOCK_USER1,
            actions.addUserRequest,
            [MOCK_USER1],
            {type: types.ADD, user: MOCK_USER1}
        );
    });

    it("should request to delete user and dispatch action with type DELETE", () => {
        assertActions(
            `users/${id}`,
            undefined,
            actions.deleteUserRequest,
            [],
            {type: types.DELETE}
        );
    });
});