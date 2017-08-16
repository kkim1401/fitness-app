import React from "react";
import {shallow} from "enzyme";
import {ExerciseInstance, mapStateToProps} from "../../components/ExerciseInstance";
import {assertInputs} from "../../../../util/testHelper";
import e from "../../../exercises";

const {MOCK_EXERCISE1, MOCK_EXERCISE2, NAME: exercisesNAME} = e.constants;


describe("ExerciseInstance component", () => {
    const props = {
        number: 2,
        exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2]
    },
        wrapper = shallow(<ExerciseInstance {...props}/>);

    it("renders properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has input for order", () => {
        assertInputs(wrapper, 0, "Order: ", "number", "order");
        expect(wrapper.find("input[name='order']").props().readOnly).toBe(true);
        expect(wrapper.find("input[name='order']").props().value).toBe(props.number);
    });

    it("has select tag and options for list of exercises to pick from", () => {
        const selectWrapper = wrapper.find("select");

        expect(selectWrapper.exists()).toBe(true);
        expect(selectWrapper.parent().type()).toBe("label");
        expect(selectWrapper.find("option").at(0).text()).toBe(props.exercises[0].name);
        expect(selectWrapper.find("option").at(1).text()).toBe(props.exercises[1].name);
    });

    it("has input for number of sets", () => {
        assertInputs(wrapper, 1, "Number of sets: ", "number", "sets");
    });

    it("has input for number of reps", () => {
        assertInputs(wrapper, 2, "Number of reps: ", "number", "reps");
    });

    it("has input for weight to use", () => {
        assertInputs(wrapper, 3, "Weight: ", "number", "weight");
    });

    it("has className 'exercise-instance'", () => {
        expect(wrapper.props().className).toBe("exercise-instance");
    })
});

describe("ExerciseInstance container", () => {
    it("mapStateToProps returns correct props", () => {
        expect(mapStateToProps(
            {[exercisesNAME]: [MOCK_EXERCISE1, MOCK_EXERCISE2]}
        )).toEqual({exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2]});
    });
});