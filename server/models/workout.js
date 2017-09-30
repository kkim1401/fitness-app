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
        days: [{
            day: Number,
            exerciseList: [{type: Schema.ObjectId, ref: "ExerciseInstance"}]
        }]
    }
});

//Access to deepPopulate
workoutSchema.plugin(deepPopulate(mongoose));

//Middleware to remove dependencies. I really should have used a relational database.
workoutSchema.pre("remove", function(next) {
    const workout = this;

    //Searches for all users with workout to be removed and deletes that workout from their Workout array.
    workout.model("User").update(
        {workouts: workout._id},
        {$pull: {workouts: workout._id}},
        {multi: true}
    );

    //Gets full exerciseList of exerciseInstance ids from workout to be removed.
    const fullExerciseList = workout.schedule.days.reduce((fullList, day) => {
        return [...fullList, ...day.exerciseList];
    }, []);

    //Removes all exerciseInstances used in workout to be removed.
    workout.model("ExerciseInstance").remove(
        {exercise: {$in: fullExerciseList}},
        next
    );
});

export default mongoose.model("Workout", workoutSchema);
