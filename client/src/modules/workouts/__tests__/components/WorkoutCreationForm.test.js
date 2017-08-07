import React from "react";
import {shallow} from "enzyme";
import {assertInputs} from "../../../../util/testHelper";
import {WorkoutCreationForm} from "../../components/WorkoutCreationForm";
import {Week} from "../../components/Week";

describe("WorkoutCreationForm component", () => {
    const wrapper = shallow(<WorkoutCreationForm/>);

    it("should render successfully", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a form", () => {
        expect(wrapper.find("form")).toHaveLength(1);
    });

    it("form should have a title that's not empty", () => {
        expect(wrapper.find("h2")).toHaveLength(1);
        expect(wrapper.find("h2").text()).toBeTruthy();
    });

    it("form's first input should be for name", () => {
        assertInputs(wrapper, 0, "Name: ", "text", "name", "name");
    });

    it("form should have textarea for description", () => {
        const textarea = wrapper.find("textarea"),
            props = textarea.props();

        expect(props.name).toBe("description");
        expect(textarea.parent().type()).toBe("label");
        expect(textarea.parent().childAt(0).text()).toBe("Description: ");

    });

    it("form should have Week component", () => {
        expect(wrapper.find(Week).exists()).toBe(true);
    });
});