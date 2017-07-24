import React from "react";
import {shallow, mount} from "enzyme";
import {ExerciseDetails} from "../../components/ExerciseDetails";

describe("ExerciseDetails component", () => {
    const exercise = {name: "squat", description: "leg exercise", _id: 123};

    it("renders correctly", () => {
        const wrapper = shallow(<ExerciseDetails exercise={exercise}/>);

        expect(wrapper.type()).toEqual("div");
        expect(wrapper.find("h1").text()).toBe(exercise.name);
        expect(wrapper.find("p").text()).toBe(exercise.description);
        expect(wrapper.find("button").type()).toBe("button");
    });

    it("has correct props", () => {
        const deleteExercise = jest.fn(),
            wrapper = shallow(<ExerciseDetails exercise={exercise} deleteExercise={deleteExercise}/>);

        expect(wrapper.instance().props.exercise).toEqual(exercise);
        expect(wrapper.instance().props.deleteExercise).toEqual(deleteExercise);
    });
});

describe("ExerciseDetails connected component", () => {});