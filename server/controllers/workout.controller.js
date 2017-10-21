import Workout from "../models/workout";
import ExerciseInstance from "../models/exerciseInstance";
import User from "../models/user";

export function getWorkouts(req, res) {
    req.doc
        .deepPopulate("workouts.schedule.exerciseList.exercise",
            (err, user) => {
            res.json(user.workouts);
        });
}

export function getWorkout(req, res) {
    req.doc
        .deepPopulate("schedule.exerciseList.exercise",
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

    /* Need to save all exerciseInstances in workout to database and
     replace days' arrays of exerciseInstances with arrays of exerciseInstances' _id,
     before saving the workout. */
    const newDays = workoutFromReq.schedule.map(({exerciseList, day}) => {

        //Maps out an array of exerciseInstance promises for a particular day.
        const exerciseListById = exerciseList.map(exerciseListElem => {
            const exerciseInstance = new ExerciseInstance(exerciseListElem);

            //Each exerciseInstance promise resolve to return its _id.
            return exerciseInstance.save((err, ex) => {
                if (err) {
                    return err;
                }
                return ex._id;
            });
        });

        /* If/when all the promises for a day's exerciseInstances have been resolved,
        top-level map function returns a promise that resolve to a day object with an exerciseList
        of exerciseInstance _ids, through each iteration. */
        return Promise.all(exerciseListById).then(newList => {
            return {day, exerciseList: newList}
        }).catch(err => err);
    });

    /* Waits for all promises in newDays array to be resolved.
    Then, saves workout and updates/saves user with workout _id.
    Handles all returned errors by logging them. */
    Promise.all(newDays).then(days => {
        const workout = new Workout({
            name: workoutFromReq.name,
            description: workoutFromReq.description,
            schedule: days
        });

        workout.save((err, workout) => {
            if (err) {
                return next(err);
            }

            //Need to update specified user with workout.
            const user = req.doc;

            user.workouts.push(workout._id);

            user.save(err => {
                if (err) {
                    return next(err);
                }
                res.location(`/api/workouts/${workout._id}`);
                res.status(201).end();
            });
        });
    }).catch(err => console.log(err));
}

export function deleteWorkout(req, res, next) {
    req.doc.remove(err => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
}