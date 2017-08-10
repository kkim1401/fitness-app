import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {Week} from "../../components/Week";


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
});