import React from "react";
import {mount} from "enzyme";
import ExerciseCreateWidget from "../../components/ExerciseCreateWidget";

describe("ExerciseCreateWidget Component", () => {
    let props, wrapper;

    beforeEach(() => {
        props = {addExercise: jest.fn()};
        wrapper = mount(<ExerciseCreateWidget {...props}/>);
    });

    it("renders correctly", () => {
        expect(wrapper.find("input").length).toBe(2);
        expect(wrapper.find("input").first().prop("placeholder")).toBe("name");
        expect(wrapper.find("input").last().prop("placeholder")).toBe("description");
        expect(wrapper.childAt(2).type()).toBe("button");
    });

    it("has correct props", () => {
        expect(wrapper.prop("addExercise")).toEqual(props.addExercise);
    });

    it("passes input values to addExercise if they are available", () => {
        wrapper.find("input").get(0).value = "test1";
        wrapper.find("input").get(1).value = "test2";
        wrapper.find("button").simulate("click");

        expect(wrapper.prop("addExercise").mock.calls.length).toBe(1);
    });

    it("denies access to addExercise if input values are blank", () => {
        wrapper.find("button").simulate("click");

        expect(wrapper.prop("addExercise").mock.calls.length).toBe(0);
    });
});
