import React from "react";
import {shallow, mount} from "enzyme";
import ExerciseCreateWidget from "../../components/ExerciseCreateWidget";

describe("ExerciseCreateWidget component", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<ExerciseCreateWidget/>);

        expect(wrapper.find("input").length).toBe(2);
        expect(wrapper.find("input").first().prop("placeholder")).toBe("name");
        expect(wrapper.find("input").last().prop("placeholder")).toBe("description");
        expect(wrapper.find("button").type()).toBe("button");
    });

    it("passes input values to addExercise if they are available", () => {
        const addExercise = jest.fn(),
            wrapper = mount(<ExerciseCreateWidget addExercise={addExercise}/>);

        wrapper.find("input").get(0).value = "test1";
        wrapper.find("input").get(1).value = "test2";
        wrapper.find("button").simulate("click");
        expect(wrapper.prop("addExercise").mock.calls.length).toBe(1);
    });

    it("denies access to addExercise if input values are blank", () => {
        const addExercise = jest.fn(),
            wrapper = mount(<ExerciseCreateWidget addExercise={addExercise}/>);

        wrapper.find("button").simulate("click");
        expect(wrapper.prop("addExercise").mock.calls.length).toBe(0);
    });
});
