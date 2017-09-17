import React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {assertFields, assertFieldArrays, createMockStore} from "../../../../util/testHelper";
import WorkoutCreationForm from "../../components/WorkoutCreationForm";
import e from "../../../exercises";

describe("WorkoutCreationForm component", () => {
    const store = createMockStore({[e.constants.NAME]: [e.constants.MOCK_EXERCISE1]}),
        wrapper = mount(<Provider store={store}><WorkoutCreationForm/></Provider>);

    it("should render successfully", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a form", () => {
        expect(wrapper.find("form")).toHaveLength(1);
        expect(typeof wrapper.find("form").props().onSubmit).toBe("function");
    });

    it("form should have a title that's not empty", () => {
        expect(wrapper.find("h2")).toHaveLength(1);
        expect(wrapper.find("h2").text()).toBeTruthy();
    });

    it("form should have Field for rendering input for name", () => {
        assertFields(wrapper, 0, "name", "input", "Name", "text");
    });

    it("form should have Field for rendering textarea for description", () => {
        assertFields(wrapper, 1, "description", "textarea", "Description");
    });

    it("should have button to submit form", () => {
        expect(wrapper.find("button[name='submit']").exists()).toBe(true);
    });

    it("should have FieldArray component for rendering Week components", () => {
        assertFieldArrays(wrapper, 0, "schedule.weeks");
    });
});
