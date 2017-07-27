import React from "react";
import {shallow} from "enzyme";
import Exercise from "../../components/Exercise";

const exercise = {name: "squat", description: "leg exercise", _id: 123},
    props = {exercise};

describe("Exercise component", () => {
    const wrapper = shallow(<Exercise {...props}/>);
    const Link = wrapper.find("Link");

    it("renders correctly", () => {
        expect(wrapper.type()).toBe("li");
        expect(Link.length).toBe(1);
        expect(Link.prop("to")).toEqual(`/exercises/${exercise._id}`);
        expect(Link.prop("children")).toEqual(exercise.name);
    });
});