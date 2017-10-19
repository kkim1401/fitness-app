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
        .catch(() => console.log("Test db failed to initialize!"));
});

describe("Deleting Exercise", () => {
    it("should remove its own instances in workouts and exerciseInstances", async () => {
        const {exercises} = testValues;

        try {
            await exercises[0].remove();
        }
        catch (e) {
            console.log(e);
        }



    });
});
