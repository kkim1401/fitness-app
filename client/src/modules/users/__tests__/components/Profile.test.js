import React from "react";
import {shallow} from "enzyme";
import {Profile, mapStateToProps} from "../../components/Profile";
import {NAME as usersNAME} from "../../constants";

describe("Profile component", () => {
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
            wrapper = shallow(<Profile {...props}/>),
            ulWrapper1 = wrapper.find("ul").first(),
            ulWrapper2 = wrapper.find("ul").at(1);

        function assertLi(wrapper, index, expected) {
            expect(wrapper.childAt(index).text()).toEqual(expected);
        }

        expect(ulWrapper1).toHaveLength(1);
        expect(ulWrapper1.children()).toHaveLength(4);
        assertLi(ulWrapper1, 0, `Name: ${props.name}`);
        assertLi(ulWrapper1, 1, `Gender: ${props.gender}`);
        assertLi(ulWrapper1, 2, `Age: ${props.age}`);

        expect(ulWrapper2).toHaveLength(1);
        expect(ulWrapper2.children()).toHaveLength(3);
        assertLi(ulWrapper2, 0, `Squat: ${props.maxes.squat}`);
        assertLi(ulWrapper2, 1, `Bench: ${props.maxes.bench}`);
        assertLi(ulWrapper2, 2, `Deadlift: ${props.maxes.deadlift}`);
    });

    it("mapStateToProps should return correct props", () => {
        expect(mapStateToProps(
            {
                [usersNAME]: {
                    name: "Zoe",
                    gender: "female",
                    age: 22,
                    maxes: {
                        squat: 185,
                        bench: 95,
                        deadlift: 225
                    }
                }
            }
        )).toEqual(
            {
                name: "Zoe",
                gender: "female",
                age: 22,
                maxes: {
                    squat: 185,
                    bench: 95,
                    deadlift: 225
                }
            }
        );
    });
});

