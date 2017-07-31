import React from "react";
import {shallow, mount} from "enzyme";
import {createMockStore} from "../../../../util/testHelper";
import moxios from "moxios";
import {ExerciseListContainer as ExerciseListHOC, mapStateToProps} from "../../components/ExerciseListContainer";
import {NAME as exercisesNAME, MOCK_EXERCISE1, MOCK_EXERCISE2, MOCK_EXERCISE3} from "../../constants";
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
        expect(typeof exerciseCreateWidgetWrapper.props().addExercise).toEqual("function");
    });

    it("mapStateToProps returns correct props", () => {
        expect(
            mapStateToProps(
                {[exercisesNAME]: exercises},
                {match: {params: {user}}}
            )
        ).toEqual({[exercisesNAME]: exercises, user})
    });

    describe("methods", () => {

        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        function setUpAsyncWrapperWithRouter(endpoint, response) {
            moxios.stubRequest(`/api/${endpoint}`, {
                status: 200,
                response
            });

            //Creating router context since component is dependent on router.
            const store = createMockStore(),
                context = createRouterContext(),
                childContextTypes = {router: PropTypes.object};

            return {store, context, childContextTypes}
        }

        it("componentDidMount is called during mount, and it dispatches action with type ADD_LIST", () => {
            let action;

            const {store, context, childContextTypes} =
                setUpAsyncWrapperWithRouter(`${user}/exercises`, [MOCK_EXERCISE1, MOCK_EXERCISE3]),
                spy = jest.spyOn(ExerciseListHOC.prototype, "componentDidMount"),
                props = {
                    exercises,
                    user,
                    dispatch(arg) {
                        action = arg;
                    }
                },
                wrapper = mount(<ExerciseListHOC {...props}/>, {context, childContextTypes});

            expect(spy).toHaveBeenCalled();

            return store.dispatch(action).then(() => {
                expect(store.getActions()).toEqual([{type: types.ADD_LIST, exercises: [MOCK_EXERCISE1, MOCK_EXERCISE3]}]);
            });
        });

        it("handleClick dispatches action with type ADD", () => {
            let action;

            const {store, context, childContextTypes} = setUpAsyncWrapperWithRouter(`${user}/exercises`, MOCK_EXERCISE2),
                props = {
                user,
                dispatch(arg) {
                    action = arg
                }
            },
                wrapper = shallow(<ExerciseListHOC {...props}/>, {context, childContextTypes});

            wrapper.instance().handleClick([MOCK_EXERCISE2]);

            return store.dispatch(action).then(() => {
                expect(store.getActions()).toEqual([{type: types.ADD, exercise: MOCK_EXERCISE2}]);
            });
        });
    });
});