import React from "react";
import {shallow} from "enzyme";
import {ExerciseInstance, mapStateToProps} from "../../components/ExerciseInstance";
import {assertInputs} from "../../../../util/testHelper";
import e from "../../../exercises";
import {Field} from "redux-form";

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

    it("has Field for order", () => {
        /*const order = wrapper.find(Field).at(0),
            props = order.props();

        expect(props.name).toMatch(/.order$/);
        expect(props.type).toBe("number");
        expect(props.component).toBe("input");
        */
    });

    it("has select tag and options for list of exercises to pick from", () => {
        const selectWrapper = wrapper.find("select");

        expect(selectWrapper.exists()).toBe(true);
        expect(selectWrapper.parent().type()).toBe("label");
        expect(selectWrapper.props().name).toBe("exercises");
        expect(selectWrapper.find("option").at(0).text()).toBe(props.exercises[0].name);
        expect(selectWrapper.find("option").at(1).text()).toBe(props.exercises[1].name);
    });

    it("has input for number of sets", () => {
    });

    it("has input for number of reps", () => {
    });

    it("has input for weight to use", () => {
    });
});

describe("ExerciseInstance container", () => {
    it("mapStateToProps returns correct props", () => {
        expect(mapStateToProps(
            {[exercisesNAME]: [MOCK_EXERCISE1, MOCK_EXERCISE2]}
        )).toEqual({exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2]});
    });
});