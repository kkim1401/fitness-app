import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {Week} from "../../components/Week";
import {Day} from "../../components/Day";


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

    it("should have Day component", () => {
        expect(wrapper.find(Day).exists()).toBe(true);
    });

    it("should have button to add more Day components", () => {
        const buttonWrapper = wrapper.find(".add"),
            dayNumber = wrapper.find(Day).length;

        expect(buttonWrapper.exists()).toBe(true);
        expect(typeof buttonWrapper.props().onClick).toBe("function");

        buttonWrapper.simulate("click");
        expect(wrapper.find(Day)).toHaveLength(dayNumber + 1);
    });
});