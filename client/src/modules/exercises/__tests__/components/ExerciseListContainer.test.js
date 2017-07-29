import React from "react";
import {connect} from "react-redux";
import {shallow, mount} from "enzyme";
import {shallowWithStore, mountWithStore, createMockStore} from "../../../../util/testHelper";
import moxios from "moxios";
import {ExerciseListContainer as ExerciseListHOC, mapStateToProps} from "../../components/ExerciseListContainer";
import {NAME as exercisesNAME, MOCK_EXERCISE1, MOCK_EXERCISE3} from "../../constants";
import * as types from "../../actionTypes";
import createRouterContext from 'react-router-test-context';
import PropTypes from 'prop-types';


describe("ExerciseListContainer", () => {
    const exercises = [MOCK_EXERCISE1, MOCK_EXERCISE3],
        user = 123;

    it("renders properly", () => {
        const wrapper = shallow(<ExerciseListHOC exercises={exercises}/>),
            exerciseListWrapper = wrapper.find("ExerciseList"),
            exerciseCreateWidgetWrapper = wrapper.find("ExerciseCreateWidget");

        expect(exerciseListWrapper).toHaveLength(1);
        expect(exerciseListWrapper.props().exercises).toEqual(exercises);
        expect(exerciseCreateWidgetWrapper).toHaveLength(1);
    });

    it("mapStateToProps returns correct props", () => {
        expect(
            mapStateToProps(
                {[exercisesNAME]: exercises},
                {match: {params: {user}}}
            )
        ).toEqual({[exercisesNAME]: exercises, user})
    });

    it("componentDidMount and initial dispatch are called", () => {
        const spy = jest.spyOn(ExerciseListHOC.prototype, "componentDidMount"),
            context = createRouterContext(),
            childContextTypes = {router: PropTypes.object},
            dispatchMock = jest.fn(),
            props = {
                exercises,
                dispatch() {
                    dispatchMock();
                }
            },

            wrapper = mount(<ExerciseListHOC {...props}/>, {context, childContextTypes});

        expect(spy).toHaveBeenCalled();
        expect(dispatchMock.mock.calls.length).toBe(1);
    });
});