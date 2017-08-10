import React from "react";
import {shallow} from "enzyme";
import {ExerciseInstance} from "../../components/ExerciseInstance";
import {assertInputs} from "../../../../util/testHelper";

describe("ExerciseInstance component", () => {
    const props = {number: 2},
        wrapper = shallow(<ExerciseInstance {...props}/>);

    it("renders properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has input for order", () => {
        assertInputs(wrapper, 0, "Order: ", "number", "order");
        expect(wrapper.find("input[name='order']").props().readOnly).toBe(true);
        expect(wrapper.find("input[name='order']").props().value).toBe(props.number);
    });

    it("has select tag and options for list of exercises to pick from", () => {
        const selectWrapper = wrapper.find("select");

        expect(selectWrapper.exists()).toBe(true);
        expect(selectWrapper.parent().type()).toBe("label");
        expect(selectWrapper.contains(<option></option>)).toBe(true);
    });

});