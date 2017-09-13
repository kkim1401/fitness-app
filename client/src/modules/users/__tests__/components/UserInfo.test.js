import React from "react";
import {shallow, mount} from "enzyme";
import {UserInfo, mapStateToProps} from "../../components/UserInfo";
import {NAME as usersNAME, MOCK_USER1} from "../../constants";
import * as types from "../../actionTypes";
import {createMockStore} from "../../../../util/testHelper";
import moxios from "moxios";

describe("UserInfo component", () => {
    it("renders properly", () => {
        /*
        Filled and blank versions of UserInfo are similar but have a few differences.
        Testing filled version completely but only testing the differences in blank version.
        */
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
            propsNoInfo = {name: "", gender: "", age: 0, maxes: {squat: 0, bench: 0, deadlift: 0}},
            wrapper = shallow(<UserInfo {...props}/>),
            wrapperNoInfo = shallow(<UserInfo {...propsNoInfo}/>),
            formWrapper = wrapper.find("form"),
            labelWrapper = wrapper.find("label");

        expect(typeof formWrapper.props().onSubmit).toBe("function");
        expect(formWrapper.find("h3")).toHaveLength(2);
        expect(formWrapper.find("h3").at(0).text()).toBe("User's Info");
        expect(formWrapper.find("h3").at(1).text()).toBe("1RM");

        function assertLabel(index, text, inputName, type, field) {
            const label = labelWrapper.at(index),
                input = label.childAt(1),
                inputProps = input.props();

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

        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").props().type).toBe("submit");
        expect(wrapper.find("button").text()).toBe("Update");
        expect(wrapperNoInfo.find("button").text()).toBe("Submit");
    });

    it("mapStateToProps returns correct props", () => {
        expect(
            mapStateToProps(
                {
                    [usersNAME]: {
                        name: "Kevin",
                        gender: "male",
                        age: 24,
                        maxes: {
                            squat: 365,
                            bench: 255,
                            deadlift: 505
                        },
                        id: 123
                    }
                }
            )
        ).toEqual(
            {
                name: "Kevin",
                gender: "male",
                age: 24,
                maxes: {
                    squat: 365,
                    bench: 255,
                    deadlift: 505,
                },
                id: 123
            }
        )
    });

    describe("form's onSubmit", () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it("calls dispatch with addUserRequest", () => {
            moxios.stubRequest("/api/users", {
                status: 200,
                response: MOCK_USER1
            });

            let action;

            const props = {
                name: "",
                gender: "",
                age: 0,
                maxes: {
                    squat: 0,
                    bench: 0,
                    deadlift: 0
                },
                id: 0,
                dispatch(arg) {
                    action = arg;
                }
            },
                wrapper = mount(<UserInfo {...props}/>),
                store = createMockStore();

            wrapper.find("form").simulate("submit");

            return store.dispatch(action).then(() => {
                expect(store.getActions()).toEqual([{type: types.ADD, user: MOCK_USER1}]);
            });
        });

        it("calls dispatch with updateUserDetails", () => {
            moxios.stubRequest("/api/users/123", {
                status: 200,
                response: MOCK_USER1
            });

            let action;

            const props = {
                name: "Steve",
                gender: "male",
                age: 24,
                maxes: {
                    squat: 225,
                    bench: 185,
                    deadlift: 315
                },
                id: 123,
                dispatch(arg) {
                    action = arg;
                }
            },
                wrapper = mount(<UserInfo {...props}/>),
                store = createMockStore();

            wrapper.find("form").simulate("submit");

            return store.dispatch(action).then(() => {
                expect(store.getActions()).toEqual([{type: types.ADD, user: MOCK_USER1}]);
            });
        });
    });
});