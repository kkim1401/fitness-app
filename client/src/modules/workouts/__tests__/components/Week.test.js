import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {Week} from "../../components/Week";
import Days from "../../components/Day";

describe("Week component", () => {
    const props = {number: 1},
        wrapper = shallow(<Week {...props}/>);

    it("should render properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have input for week", () => {
        assertInputs(wrapper, 0, "Week: ", "number", "week");
        expect(wrapper.find("input[name='week']").props().value).toBe(props.number);
        expect(wrapper.find("input[name='week']").props().readOnly).toBe(true);
    });

    it("should have Days component", () => {
        expect(wrapper.find(Days).exists()).toBe(true);
    });
});