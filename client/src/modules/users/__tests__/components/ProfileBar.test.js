import React from "react";
import {shallow} from "enzyme";
import {ProfileBar, mapStateToProps} from "../../components/ProfileBar";
import {NAME as usersNAME} from "../../constants";
import {Link} from "react-router-dom";

describe("ProfileBar component", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<ProfileBar name={"Kevin"}/>),
            linkWrapper = wrapper.find(Link);

        expect(linkWrapper).toHaveLength(1);
        expect(linkWrapper.props().to).toBe("/profile");
        expect(linkWrapper.props().children).toBe("Kevin");
    });

    it("mapStateToProps returns correct props", () => {
        expect(
            mapStateToProps(
                {[usersNAME]: {name: "Nick"}}
            )
        ).toEqual({name: "Nick"});
    });
});