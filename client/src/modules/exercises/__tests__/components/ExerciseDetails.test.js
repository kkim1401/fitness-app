import React from "react";
import {shallow} from "enzyme";
import {shallowWithStore, createMockStore} from "../../../../util/testHelper";
import {connect} from "react-redux";
import moxios from "moxios";
import {ExerciseDetails, mapStateToProps, mapDispatchToProps} from "../../components/ExerciseDetails";
import {NAME as exercisesNAME, MOCK_EXERCISE1, MOCK_EXERCISE2} from "../../constants";
import * as types from "../../actionTypes";

describe("ExerciseDetails component", () => {

    it("renders correctly", () => {
        const wrapper = shallow(<ExerciseDetails exercise={MOCK_EXERCISE1}/>);

        expect(wrapper.find("h1").text()).toBe(MOCK_EXERCISE1.name);
        expect(wrapper.find("p").text()).toBe(MOCK_EXERCISE1.description);
        expect(wrapper.find("button")).toHaveLength(1);
    });
});

describe("ExerciseDetails container", () => {
    it("mapStateToProps should return props with exercise property", () => {
        expect(
            mapStateToProps(
                {[exercisesNAME]: [MOCK_EXERCISE1, MOCK_EXERCISE2]},
                {match: {params: {id: MOCK_EXERCISE1._id}}}
            )
        ).toEqual({exercise: MOCK_EXERCISE1});
    });

    it("dispatch in deleteExercise from mapDispatchToProps works", async () => {
        moxios.install();
        moxios.stubRequest(`/api/exercises/${MOCK_EXERCISE1._id}`, {
            status: 200,
            response: MOCK_EXERCISE1
        });

        const store = createMockStore(),
            ExerciseDetailsContainer = connect(undefined, mapDispatchToProps)(ExerciseDetails),
            pushMock = jest.fn(),
            component = shallowWithStore(
            <ExerciseDetailsContainer match={{params:{id: MOCK_EXERCISE1._id}}}
                                      history={{push(args) {pushMock(args)}}}/>, store);

        expect.assertions(2);
        await component.props().deleteExercise();

        expect(store.getActions()).toEqual([{type: types.DELETE, id: MOCK_EXERCISE1._id}]);
        expect(pushMock.mock.calls[0][0]).toBe("/");

        moxios.uninstall();
    });
});