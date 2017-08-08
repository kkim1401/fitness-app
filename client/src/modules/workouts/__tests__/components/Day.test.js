import React from "react";
import {shallow} from "enzyme";
import {Day} from "../../components/Day";

describe("Day component", () => {
    const wrapper = shallow(<Day/>);

    it("renders properly", () => {
        expect(wrapper.exists()).toBe(true);
    });


});
