import React from "react";
import {shallow, mount} from "enzyme";
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
        assertInputs(wrapper, 0, "Name: ", "text", "name");
        expect(wrapper.find("input").at(0).props().defaultValue).toBe("name");
    });

    it("form should have textarea for description", () => {
        const textarea = wrapper.find("textarea"),
            props = textarea.props();

        expect(props.name).toBe("description");
        expect(textarea.parent().type()).toBe("label");
        expect(textarea.parent().childAt(0).text()).toBe("Description: ");
    });

    it("should have button to submit form", () => {
        expect(wrapper.find("button[name='submit']").exists()).toBe(true);
        expect(typeof wrapper.find("button[name='submit']").props().onSubmit).toBe("function");
    });
});
