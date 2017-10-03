import User from "./models/user";
import Workout from "./models/workout";
import Exercise from "./models/exercise";
import ExerciseInstance from "./models/exerciseInstance";

export default async function() {
    const arrOfExercises = await Exercise.create([
        {name: "squat", description: "leg exercise"},
        {name: "bench", description: "chest exercise"}
    ]);

    const arrOfExerciseInstances = await ExerciseInstance.create([
        {
            exercise: arrOfExercises[0]._id,
            order: 1,
            setNumber: 3,
            reps: 5,
            weight: 315
        },
        {
            exercise: arrOfExercises[1]._id,
            order: 2,
            setNumber: 3,
            reps: 6,
            weight: 225
        }
    ]);

    const workout = await Workout.create({
        name: "Test workout",
        description: "Test description",
        schedule: [
            {
                day: 1,
                exerciseList: [arrOfExerciseInstances[0]._id]
            },
            {
                day: 2,
                exerciseList: [arrOfExerciseInstances[1]._id]
            }
        ]
    });

    const user = await User.create({
        name: "Nick",
        gender: "male",
        age: 25,
        maxes: {
            squat: 500,
            bench: 265,
            deadlift: 545
        },
        workouts: [workout._id],
        exercises: [arrOfExercises[0]._id, arrOfExercises[1]._id]
    });

    return {
        testUser: user,
        testWorkout: workout
    }
}