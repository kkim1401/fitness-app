import mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import User from "../models/user";
import Workout from "../models/workout";
import Exercise from "../models/exercise";
import ExerciseInstance from "../models/exerciseInstance";

const mockgoose = new Mockgoose(mongoose);

beforeAll(() => {
    return mockgoose.prepareStorage().then(() => {
        mongoose.connection.on("connected", () => {
            console.log("models test db connection is open");
        });
        return mongoose.connect("mongodb://localhost/modelsTest");
    });
});

describe("User model", () => {
    it("should", () => {

    });
});
