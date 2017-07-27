import React from "react";
import {shallow} from "enzyme";
import {ExerciseDetails, mapStateToProps, mapDispatchToProps} from "../../components/ExerciseDetails";
import {MOCK_EXERCISE1, MOCK_EXERCISE2} from "../../constants"

describe("ExerciseDetails component", () => {

    it("renders correctly", () => {
        const wrapper = shallow(<ExerciseDetails exercise={MOCK_EXERCISE1}/>);

        expect(wrapper.find("h1").text()).toBe(MOCK_EXERCISE1.name);
        expect(wrapper.find("p").text()).toBe(MOCK_EXERCISE1.description);
        expect(wrapper.find("button").type()).toBe("button");
    });
});

describe("ExerciseDetails container", () => {
    it("mapStateToProps returns props object with exercise property", () => {
        expect(
            mapStateToProps(
                {exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2]},
                {match: {params: {id: MOCK_EXERCISE1._id}}}))
            .toEqual({exercise: MOCK_EXERCISE1});
    });
});