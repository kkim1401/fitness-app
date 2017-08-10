import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {Day} from "../../components/Day";

describe("Day component", () => {
    const props = {number: 1},
        wrapper = shallow(<Day {...props}/>);

    it("renders properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has an input for number of day", () => {
        assertInputs(wrapper, 0, "Day: ", "number", "day");
        expect(wrapper.find("input").props().readOnly).toBe(true);
        expect(wrapper.find("input").props().value).toBe(1);
    });

    it("has title for exercises", () => {
        expect(wrapper.find("h4").exists()).toBe(true);
        expect(wrapper.find("h4").text()).toBe("Exercises");
    });
});
