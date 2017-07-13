import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: String,
    age: Number,
    maxes: {
        squat: {
            type: Number,
            default: 0
        },
        bench: {
            type: Number,
            default: 0
        },
        deadlift: {
            type: Number,
            default: 0
        }
    },
    workouts: [{type: Schema.ObjectId, ref: "Workout"}],
    exercises: [{type: Schema.ObjectId, ref: "Exercise"}]
});

export default mongoose.model("User", userSchema);

