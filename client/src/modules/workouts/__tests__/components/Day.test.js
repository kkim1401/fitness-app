import React from "react";
import {shallow} from "enzyme";
import {assertFields, assertFieldArrays} from "../../../../util/testHelper";
import {Day} from "../../components/Day";

describe("renderDays components", () => {
    const props = {
        node: "weeks[0].days[0]",
        index: 0
    },
        wrapper = shallow(<Day {...props}/>);

    it("should render properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a Field for rendering Days components", () => {
        assertFields(wrapper, 0, "weeks[0].days[0]", "input", "Day #1", "number");
    });

    it("should have a FieldArray for rendering Days components", () => {
        assertFieldArrays(wrapper, 0, "weeks[0].days[0].exerciseInstances")
    });
});