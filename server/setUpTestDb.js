import mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import User from "./models/user";
import Workout from "./models/workout";
import Exercise from "./models/exercise";
import ExerciseInstance from "./models/exerciseInstance";

const mockgoose = new Mockgoose(mongoose);

export default function setUpTestDb() {
    jest.setTimeout(12000); //Timeout needs to be increased for API requests, according to Supertest API docs.

    return mockgoose.prepareStorage()
        .then(() => {
            mongoose.connection.on("connected", () => {
                console.log("test db connection is open");
            });
            return mongoose.connect("mongodb://localhost/test");
        })
        .then(initializeTestResources)
}

async function initializeTestResources() {
    const arrOfExercises = await Exercise.create([
        {name: "squat", description: "leg exercise"},
        {name: "bench", description: "chest exercise"}
    ]);

    await ExerciseInstance.create([
        {
            exercise: arrOfExercises[0]._id,
            order: 1,
            setNumber: 3,
            reps: 5,
            weight: 315
        },
        {
            exercise: arrOfExercises[1]._id,
            order: 2,
            setNumber: 3,
            reps: 6,
            weight: 225
        }
    ]);

    //Lean returns javascript object instead of mongoose document. Makes merging a lot easier.
    const arrOfExerciseInstances = await ExerciseInstance.find({}).lean();

    await Workout.create({
        name: "Test workout",
        description: "Test description",
        schedule: [
            {
                day: 1,
                exerciseList: [arrOfExerciseInstances[0]._id]
            },
            {
                day: 2,
                exerciseList: [arrOfExerciseInstances[1]._id]
            }
        ]
    });

    const workout = await Workout.findOne({}).lean();

    await User.create({
        name: "Nick",
        gender: "male",
        age: 25,
        maxes: {
            squat: 500,
            bench: 265,
            deadlift: 545
        },
        workouts: [workout._id],
        exercises: [arrOfExercises[0]._id, arrOfExercises[1]._id]
    });

    const user = await User.findOne({}).lean();

    return {
        testUser: user,
        testWorkout: workout,
        testExercises: arrOfExercises,
        testExerciseInstances: arrOfExerciseInstances
    }
}