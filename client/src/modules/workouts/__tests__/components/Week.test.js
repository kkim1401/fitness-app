import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {Week} from "../../components/Week";


describe("Week component", () => {
    const wrapper = shallow(<Week/>);

    it("should render properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have input for week", () => {
        assertInputs(wrapper, 0, "Week: ", "number", "week");
    });
});