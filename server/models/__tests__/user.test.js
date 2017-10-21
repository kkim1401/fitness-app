import mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import setUpTestDb, {setUpModels} from "../../util/setUpTestDb";
import Workout from "../workout";
import User from "../user";
import Exercise from "../exercise";
import ExerciseInstance from "../exerciseInstance";

let testValues;
const mockgoose = new Mockgoose(mongoose);

beforeEach(() => {
    return setUpTestDb()
        .then(setUpModels)
        .then(data => testValues = data)
});

afterEach(() => {
    return mockgoose.helper.reset().then(() => {
        mongoose.disconnect();
    });
});

function assertArrays(created, expected) {
    expect(created.map(cr => cr._id ? cr._id.toString() : cr.toString()).sort())
        .toEqual(expected.map(ex => ex._id.toString()).sort());
}

describe("User Middleware", () => {
   it("should remove all associated workouts, exercises, and exerciseInstances after its removal", async () => {
        const {user} = testValues;

        await user.remove();

        const dbExercises = await Exercise.find({_id: {$in: user.exercises}});
        const dbExerciseInstances = await ExerciseInstance.find({exercise: {$in: user.exercises}});
        const dbWorkouts = await Workout.find({_id: {$in: user.workouts}});

        expect(dbExercises).toEqual([]);
        expect(dbExerciseInstances).toEqual([]);
        expect(dbWorkouts).toEqual([]);
    });
});