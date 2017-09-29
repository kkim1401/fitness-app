import mongoose from "mongoose";
import deepPopulate from "mongoose-deep-populate";

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

//Access to deepPopulate
userSchema.plugin(deepPopulate(mongoose));

//Middleware to remove dependencies
userSchema.pre("remove", function(next) {
    const user = this;

    //Removes all workouts from Workout collection that are associated with this user.
    user.model("Workout").remove(
        {_id: {$in: user.workouts}}
    );

    //Removes all exercises from Exercise collection that are associated with this user.
    user.model("Exercise").remove(
        {_id: {$in: user.exercises}}
    );

    user.model("ExerciseInstance").remove(

    )

});

export default mongoose.model("User", userSchema);

