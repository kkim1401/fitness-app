import React from "react";
import {shallow} from "enzyme";
import {WorkoutCreationFormContainer} from "../../components/WorkoutCreationFormContainer";

describe("WorkoutCreationFormContainer", () => {
    const props = {handleFormSubmit() {}},
        wrapper = shallow(<WorkoutCreationFormContainer {...props}/>);

    it("renders correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has onSubmit prop", () => {
        expect(typeof wrapper.props().onSubmit).toBe("function");
    })
});