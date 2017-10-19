import mongoose from "mongoose";
import setUpTestDb, {setUpModels} from "../../util/setUpTestDb";
import User from "../user";
import Exercise from "../exercise";
import ExerciseInstance from "../exerciseInstance";

let testValues;

beforeEach(() => {
    return setUpTestDb()
        .then(setUpModels)
        .then(data => testValues = data)
});

afterEach(() => {
    mongoose.disconnect();
});

describe("Exercise Middleware", () => {
    it("should return appropriate exercise, exerciseInstance, and user based on an exercise id", async () => {
        const {exercises, user, exerciseInstances} = testValues;
        const dbExercise = await Exercise.findById(exercises[0]._id);
        const dbExerciseInstance = await ExerciseInstance.findOne({exercise: exercises[0]._id});
        const dbUser = await User.findOne({exercises: exercises[0]._id});

        expect(dbExercise._id).toEqual(exercises[0]._id);
        expect(dbExerciseInstance._id).toEqual(exerciseInstances[0]._id);
        expect(dbUser._id).toEqual(user._id);
    });

    it("should remove its own instances in workouts and exerciseInstances after removal", async () => {
        const {exercises} = testValues;
        await exercises[0].remove();

        const dbExercise = await Exercise.findById(exercises[0]._id);
        const dbExerciseInstance = await ExerciseInstance.findOne({exercise: exercises[0]._id});
        const dbUser = await User.findOne({exercises: exercises[0]._id});

        expect(dbExercise).toBe(null);
        expect(dbExerciseInstance).toBe(null);
        expect(dbUser).toBe(null);
    });
});
