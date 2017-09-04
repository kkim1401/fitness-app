import React from "react";
import {shallow} from "enzyme";
import Exercise from "../../components/Exercise";
import {MOCK_EXERCISE1} from "../../constants";

const props = {exercise: MOCK_EXERCISE1};

describe("Exercise component", () => {
    const wrapper = shallow(<Exercise {...props}/>);
    const linkWrapper = wrapper.find("Link");

    it("renders correctly", () => {
        expect(wrapper.type()).toBe("li");
        expect(linkWrapper).toHaveLength(1);
        expect(linkWrapper.prop("to")).toEqual(`/exercises/${MOCK_EXERCISE1._id}`);
        expect(linkWrapper.prop("children")).toEqual(MOCK_EXERCISE1.name);
    });
});