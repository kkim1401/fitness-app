import React from "react";
import {shallow} from "enzyme";
import {assertFields, assertFieldArrays} from "../../../../util/testHelper";
import {Week} from "../../components/Week";

describe("renderWeeks components", () => {
    const props = {
        node: "schedule.weeks[0]",
        index: 0
    },
        wrapper = shallow(<Week {...props}/>);

    it("should render properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a Field for Week input", () => {
       assertFields(wrapper, 0, "schedule.weeks[0].week", "input", "Week", "number");
    });

    it("should have a FieldArray for rendering Day components", () => {
        assertFieldArrays(wrapper, 0, "schedule.weeks[0].days");
    });
});