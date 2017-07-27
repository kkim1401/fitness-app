import React from "react";
import {shallow} from "enzyme";
import Exercise from "../../components/Exercise";
import {MOCK_EXERCISE1} from "../../constants";

const props = {exercise: MOCK_EXERCISE1};

describe("Exercise component", () => {
    const wrapper = shallow(<Exercise {...props}/>);
    const Link = wrapper.find("Link");

    it("renders correctly", () => {
        expect(wrapper.type()).toBe("li");
        expect(Link.length).toBe(1);
        expect(Link.prop("to")).toEqual(`/exercises/${MOCK_EXERCISE1._id}`);
        expect(Link.prop("children")).toEqual(MOCK_EXERCISE1.name);
    });
});