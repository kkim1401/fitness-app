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
    it("should return appropriate exercises, exerciseInstances, and workout based on a user id", async () => {
        const {exercises, exerciseInstances, workout, user} = testValues;

        const dbUser = await User.findById(user._id);
        const dbExerciseInstances = await ExerciseInstance.find({exercise: {$in: dbUser.exercises}});

        assertArrays(dbUser.workouts, [workout]);
        assertArrays(dbUser.exercises, exercises);
        assertArrays(dbExerciseInstances, exerciseInstances);
    });

    it("should remove all associated workouts, exercises, and exerciseInstances after its removal", async () => {
        const {user} = testValues;

        const dbUser = await User.findById(user._id);
        await dbUser.remove();

        const dbExercises = await Exercise.find({});
        const dbExerciseInstances = await ExerciseInstance.find({});
        const dbWorkouts = await Workout.find({});

        expect(dbExercises).toEqual([]);
        expect(dbExerciseInstances).toEqual([]);
        expect(dbWorkouts).toEqual([]);

    });
});