import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exerciseInstanceSchema = new Schema({
    exercise: {type: Schema.ObjectId, ref: "Exercise"},
    order: Number,
    setNumber: Number,
    reps: Number,
    weight: Number
});

export default mongoose.model("ExerciseInstance", exerciseInstanceSchema);


