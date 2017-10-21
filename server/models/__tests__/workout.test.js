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

describe("Workout Middleware", () => {
    it("should remove all of its instances from all users, and remove all associated exerciseInstances", async () => {
        const {user, workout} = testValues;
        const fullExerciseList = workout.schedule.reduce((fullList, day) => {
            return [...fullList, ...day.exerciseList];
        }, []);

        await workout.remove();

        const dbUsers = await User.find({workouts: workout._id});
        const dbExerciseInstances = await ExerciseInstance.find({exercise: {$in: fullExerciseList}});

        expect(dbUsers).toEqual([]);
        expect(dbExerciseInstances).toEqual([]);
    });
});