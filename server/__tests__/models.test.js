import mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import setUpTestDb from "../util/setUpTestDb";
import User from "../models/user";
import Workout from "../models/workout";
import Exercise from "../models/exercise";
import ExerciseInstance from "../models/exerciseInstance";

const mockgoose = new Mockgoose(mongoose);

async function setUpModels() {
    let exercises, exerciseInstances, workout, user;

    try {
        exercises = await Exercise.create([
            {name: "Dumbbell Curl", description: "bicep isolation"},
            {name: "Tricep Extension", description: "tricep isolation"}
        ]);
    }
    catch (e) {
        console.log(e);
    }

    try {
        exerciseInstances = await ExerciseInstance.create([
            {
                exercise: exercises[0]._id,
                order: 1,
                setNumber: 3,
                reps: 10,
                weight: 80
            },
            {
                exercise: exercises[1]._id,
                order: 2,
                setNumber: 3,
                reps: 10,
                weight: 60

            }
        ]);
    }
    catch (e) {
        console.log(e);
    }

    try {
        workout = await Workout.create({
            name: "Accessory workout",
            description: "GPP",
            schedule: [
                {
                    day: 1,
                    exerciseList: [exerciseInstances[0]._id]
                },
                {
                    day: 2,
                    exerciseList: [exerciseInstances[1]._id]
                }
            ]
        });
    }
    catch (e) {
        console.log(e);
    }

    try {
        user = await User.create({
            name: "Kevin",
            gender: "male",
            age: 25,
            maxes: {
                squat: 365,
                bench: 265,
                deadlift: 545
            },
            workouts: [workout._id],
            exercises: [exercises[0]._id, exercises[1]._id]
        });
    }
    catch (e) {
        console.log(e);
    }

    return {user, workout, exerciseInstances, exercises};
}

let testValues;

beforeEach(() => {
    return setUpTestDb()
        .then(setUpModels)
        .then(data => testValues = data)
});

afterEach(() => {
    mongoose.disconnect();
});

describe("Deleting Exercise", () => {
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
