import React from "react";
import {shallow} from "enzyme";
import withAdd from "../../components/AddHOC";

describe("withADD HOC", () => {
    const Mock = () => <div>Mock</div>,
        MockToAdd = () => <div>MockToAdd</div>,
        MockWithAdd = withAdd(Mock, MockToAdd),
        testProps = {
            test: true
        },
        wrapper = shallow(<MockWithAdd {...testProps}/>);

    it("withAdd renders correctly with a mock inner component and component to add", () => {
       expect(wrapper.find("Mock").exists()).toBe(true);
       expect(wrapper.find("MockToAdd").exists()).toBe(true);
    });

    it("withAdd passes props to inner component", () => {
        expect(wrapper.find("Mock").props().test).toBe(true);
    });

    it("withAdd component has initial count of 1 in state", () => {
        expect(wrapper.state().count).toBe(1);
    });

    it("withAdd passes number prop to MockToAdd component", () => {
        expect(wrapper.find("MockToAdd").props().number).toBe(1);
    });

    it("withAdd has button to add new components", () => {
        const buttonWrapper = wrapper.find(".add"),
            MockToAddNumber = wrapper.find("MockToAdd").length;

        expect(buttonWrapper.exists()).toBe(true);
        expect(typeof buttonWrapper.props().onClick).toBe("function");

        buttonWrapper.simulate("click");
        expect(wrapper.find("MockToAdd")).toHaveLength(MockToAddNumber+1);
        expect(wrapper.state().count).toBe(2);
        expect(wrapper.find("MockToAdd").at(1).props().number).toBe(2);
    });
});