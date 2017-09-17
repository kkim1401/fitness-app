import React from "react";
import {shallow} from "enzyme";
import {assertFields, assertFieldArrays} from "../../../../util/testHelper";
import {Day} from "../../components/Day";

describe("renderDays components", () => {
    const props = {
        node: "schedule.weeks[0].days[0]",
        index: 0
    },
        wrapper = shallow(<Day {...props}/>);

    it("should render properly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a Field for rendering a Day input", () => {
        assertFields(wrapper, 0, "schedule.weeks[0].days[0].day", "input", "Day", "number");
    });

    it("should have a FieldArray for rendering ExerciseInstance components", () => {
        assertFieldArrays(wrapper, 0, "schedule.weeks[0].days[0].exerciseList")
    });
});