import React from "react";
import {shallow} from "enzyme";
import {NavBar, mapStateToProps} from "../../components/NavBar";
import {NAME as usersNAME} from "../../constants";

describe("NavBar component", () => {
    it("renders correctly", () => {
        let wrapper = shallow(<NavBar/>),
            pageWrapper = wrapper.find("Page");

        function assertPages(index, path, children) {
            expect(pageWrapper.at(index).props().link).toEqual(path);
            expect(pageWrapper.at(index).props().children).toEqual(children);
        }

        expect(wrapper.type()).toEqual("nav");
        expect(pageWrapper).toHaveLength(5);

        assertPages(0, "/", "Home");
        assertPages(1, "/userInfo", "UserInfo");
        assertPages(2, "/plan", "Plan");
        assertPages(3, "/exercises", "Exercises");
        assertPages(4, "/form", "Workout Creation Form");

        //if id props is passed
        wrapper = shallow(<NavBar id={123}/>);
        pageWrapper = wrapper.find("Page");

        assertPages(3, `/${123}/exercises`, "Exercises");
    });

    it("mapStateToProps returns correct props", () => {
        expect(
            mapStateToProps({
                [usersNAME]: {id: 123}}
            )
        ).toEqual({id: 123});
    });
});


