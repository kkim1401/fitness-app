import Workout from "../models/workout";
import ExerciseInstance from "../models/exerciseInstance";
import User from "../models/user";

export function getWorkouts(req, res) {
    req.doc
        .deepPopulate("workouts.schedule.days.exerciseList.exercise",
            (err, user) => {
            res.json(user.workouts);
        });
}

export function getWorkout(req, res) {
    req.doc
        .deepPopulate("schedule.days.exerciseList.exercise",
            (err, workout) => {
            res.json(workout);
        });
}

export function addWorkout(req, res, next) {
    req.checkBody("name", "Name of workout is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const workoutFromReq = req.body;

    const newDays = workoutFromReq.schedule.days.map(async ({exerciseList, day}) => {

        //Maps out an array of exerciseInstances as promises for a particular day.
        const listById = exerciseList.map(exerciseListElem => {
            const exerciseInstance = new ExerciseInstance(exerciseListElem);
            return exerciseInstance.save((err, ex) => {
                if (err) {
                    return err;
                }
                else {
                    return ex._id;
                }
            });
        });

        //Once all the promises have been resolved,
        return Promise.all(listById).then(newList => {
            return {day, exerciseList: newList}
        });
    });

    Promise.all(newDays).then(days => {
        console.log(days);
        const workout = new Workout({
            name: workoutFromReq.name,
            description: workoutFromReq.description,
            schedule: {days}
        });

        workout.save((err, workout) => {
            if (err) {
                return next(err);
            }

            //Need to update specified user with workout
            const user = req.doc;

            user.workouts.push(workout._id);

            user.save(err => {
                if (err) {
                    return next(err);
                }
                res.status(201).json(workout);
            });
        });
    });


}

export function deleteWorkout(req, res, next) {
    req.doc.remove(err => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
}