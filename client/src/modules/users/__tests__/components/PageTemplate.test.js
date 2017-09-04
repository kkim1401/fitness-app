import React from 'react';
import {shallow} from "enzyme";
import withTemplate from "../../components/PageTemplate";

describe("PageTemplate HOC", () => {
    it("renders properly", () => {
        const Mock = () => <div>Mock</div>,
            MockWithTemplate = withTemplate(Mock),
            wrapper = shallow(<MockWithTemplate/>);

        //Children include two connected components--NavBar and ProfileBar--and one inner component.
        expect(wrapper.children()).toHaveLength(3);
        expect(wrapper.find("Mock")).toHaveLength(1);
    });
});