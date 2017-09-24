import mongoose from "mongoose";
import deepPopulate from "mongoose-deep-populate";

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    schedule: {
        weeks: [{
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
        }]
    }
});

//Access to deepPopulate
workoutSchema.plugin(deepPopulate(mongoose));

//Middleware to remove dependencies
workoutSchema.pre("remove", function(next) {
    const workout = this;
    //Searches for all users with workout to be removed and deletes that workout from their Workout array.
    workout.model("User").update(
        {workouts: workout._id},
        {$pull: {workouts: workout._id}},
        {multi: true},
        next
    );
});

export default mongoose.model("Workout", workoutSchema);
