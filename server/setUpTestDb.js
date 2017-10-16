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
    //Need to convert ObjectIds to string since created resource will always have its _id as string.
    function convertObjectIdToString(...args) {
        return args.map(obj => {
            obj._id = obj._id.toString();
            return obj;
        });
    }

    let arrOfExercises, arrOfExerciseInstances, workout, user;

    try {
        await Exercise.create([
            {name: "squat", description: "leg exercise"},
            {name: "bench", description: "chest exercise"}
        ]);
    }
    catch (e) {
        console.log(e);
    }

    //Lean returns javascript object instead of mongoose document. Makes testing and merging a lot easier.
    try {
        arrOfExercises = convertObjectIdToString(...await Exercise.find({}).lean());
    }
    catch (e){
        console.log(e);
    }

    try {
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
    }
    catch(e) {
        console.log(e);
    }

    try {
        arrOfExerciseInstances = convertObjectIdToString(...await ExerciseInstance.find({}).lean());
        //Need to make sure all cases of ObjectIds are converted to strings.
        arrOfExerciseInstances.forEach(exInstance => exInstance.exercise = exInstance.exercise.toString());
    }
    catch (e) {
        console.log(e);
    }

    try {
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
    }
    catch (e) {
        console.log(e);
    }

    try {
        workout = convertObjectIdToString(await Workout.findOne({}).lean())[0];
        workout.schedule.forEach(day => day.exerciseList.forEach((ex, index, arr) => arr[index] = ex.toString()));
    }
    catch (e) {
        console.log(e);
    }

    try {
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
    }
    catch (e) {
        console.log(e);
    }

    try {
        user = convertObjectIdToString(await User.findOne({}).lean())[0];
        user.workouts.forEach((workout, index, arr) => arr[index] = workout.toString());
        user.exercises.forEach((exercise, index, arr) => arr[index] = exercise.toString());
    }
    catch (e) {
        console.log(e);
    }

    return {
        testUser: user,
        testWorkout: workout,
        testExercises: arrOfExercises,
        testExerciseInstances: arrOfExerciseInstances
    };
}