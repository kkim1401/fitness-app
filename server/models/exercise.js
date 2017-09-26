import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String}
});

//Middleware to remove dependencies. I really should have used a relational database.
exerciseSchema.pre("remove", function(next) {
    const exercise = this;

    exercise.model("ExerciseInstance").remove(
        {exercise: exercise._id},
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

