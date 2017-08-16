import React from "react";
import {shallow} from "enzyme";
import withAdd from "../../components/AddHOC";

describe("withADD HOC", () => {
    const Mock = () => <div>Mock</div>,
        testProps = {
            test: true,
            className: "mock"
        },
        MockWithAdd = withAdd(Mock),
        wrapper = shallow(<MockWithAdd {...testProps}/>);

    it("withAdd renders correctly with a mock inner component to add", () => {
       expect(wrapper.find("Mock").exists()).toBe(true);
    });

    it("withAdd passes props to inner component", () => {
        expect(wrapper.find("Mock").props().test).toBe(true);
    });

    it("withAdd component has initial count of 1 in state", () => {
        expect(wrapper.state().count).toBe(1);
    });

    it("withAdd has button to add new components", () => {
        const buttonWrapper = wrapper.find(".add"),
            MockNumber = wrapper.find("Mock").length;

        expect(buttonWrapper.exists()).toBe(true);
        expect(typeof buttonWrapper.props().onClick).toBe("function");
        expect(buttonWrapper.text()).toBe("Add Mock");

        buttonWrapper.simulate("click");
        expect(wrapper.find("Mock")).toHaveLength(MockNumber+1);
        expect(wrapper.state().count).toBe(2);
        expect(wrapper.find("Mock").at(1).props().number).toBe(2);
    });

    it("withAdd adds className props", () => {
        expect(wrapper.props().className).toBe("mock");
    })
});