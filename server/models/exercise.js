import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String}
});

//Middleware to remove dependencies. I really should have used a relational database.
exerciseSchema.pre("remove", function(next) {
    const exercise = this;

    exercise.model("Workout").update(
        {"schedule.weeks.days.exerciseList.exercise": exercise._id},
        {$pull: {"schedule.weeks.days.exerciseList.exercise": exercise._id}},
        {multi: true},
        next
    );

    exercise.model("User").update(
        {exercises: exercise._id},
        {$pull: {exercises: exercise._id}},
        {multi: true},
        next
    );
});

export default mongoose.model("Exercise", exerciseSchema);

