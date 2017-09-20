import mongoose from "mongoose";
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    schedule: {
        weeks: {
            week: Number,
            days: [{
                day: Number,
                exerciseList: [{
                    exercise: {type: Schema.ObjectId, ref: "Exercise"},
                    order: Number,
                    setNumber: Number,
                    reps: Number,
                    weight: Number
                }]
            }]
        }
    }
});

export default mongoose.model("Workout", workoutSchema);
