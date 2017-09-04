import React from "react";
import {shallow} from "enzyme";
import ExerciseList from "../../components/ExerciseList";
import {NAME as exercisesNAME, MOCK_EXERCISE1, MOCK_EXERCISE2} from "../../constants";

describe("ExerciseList component", () => {
    it ("renders correctly", () => {
        const wrapper = shallow(<ExerciseList exercises={[MOCK_EXERCISE1, MOCK_EXERCISE2]}/>),
            exerciseWrapper = wrapper.find("Exercise");

        expect(wrapper.find("ul")).toHaveLength(1);
        expect(exerciseWrapper).toHaveLength(2);
        expect(exerciseWrapper.at(0).props().exercise).toEqual(MOCK_EXERCISE1);
        expect(exerciseWrapper.at(1).props().exercise).toEqual(MOCK_EXERCISE2);
    });
});