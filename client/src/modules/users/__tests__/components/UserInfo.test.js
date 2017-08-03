import React from "react";
import {shallow} from "enzyme";
import UserInfoContainer, {UserInfo, mapStateToProps} from "../../components/UserInfo";

describe("UserInfo component", () => {
    it("renders properly", () => {
        const props = {
            name: "Kevin",
            gender: "male",
            age: 24,
            maxes: {
                squat: 365,
                bench: 255,
                deadlift: 505
            }
        },
            wrapper = shallow(<UserInfo {...props}/>),
            formWrapper = wrapper.find("form"),
            labelWrapper = wrapper.find("label");

        expect(typeof formWrapper.props().onSubmit).toBe("function");
        expect(formWrapper.find("h3")).toHaveLength(2);
        expect(formWrapper.find("h3").at(0).text()).toBe("User's Info");
        expect(formWrapper.find("h3").at(1).text()).toBe("1RM");

        function assertLabel(index, text, inputName, type, field) {
            const label = labelWrapper.at(index),
                input = label.childAt(1),
                inputProps = input.props(),
                propsNoInfo = {name: "", gender: "", age: 0, maxes: {squat: 0, bench: 0, deadlift: 0}},
                wrapperNoInfo = shallow(<UserInfo {...propsNoInfo}/>);

            expect(label.childAt(0).text()).toBe(text);
            expect(input.type()).toBe("input");
            expect(inputProps.type).toBe(type);
            expect(inputProps.name).toBe(inputName);
            expect(inputProps.defaultValue).toBe(field);
            expect(wrapperNoInfo.find("label").at(index).childAt(1).props().defaultValue).toBe("");
        }

        expect(labelWrapper).toHaveLength(6);
        assertLabel(0, "Name: ", "name", "text", props.name);
        assertLabel(1, "Gender: ", "gender", "text", props.gender);
        assertLabel(2, "Age: ", "age", "number", props.age);
        assertLabel(3, "Squat: ", "squat", "number", props.maxes.squat);
        assertLabel(4, "Bench: ", "bench", "number", props.maxes.bench);
        assertLabel(5, "Deadlift: ", "deadlift", "number", props.maxes.deadlift);
    });
});