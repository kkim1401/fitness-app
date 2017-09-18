import Workout from "../models/workout";
import Exercise from "../models/exercise";
import User from "../models/user";

export function getWorkouts(req, res, next) {
    Workout.find().sort({name: 1}).exec((err, result) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.json(result);
    });
}

export function getWorkout(req, res, next) {
    Workout.findById(req.params.workoutId)
        .populate("schedule.days.exerciseList.exercise")
        .exec((err, result) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.json(result);
    });
}

export function addWorkout(req, res, next) {
    req.checkBody("name", "Name of workout is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const workout = new Workout(req.body);

    workout.save((err, saved) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(saved);
    });
}

export function deleteWorkout(req, res, next) {
    Workout.findById(req.params.workoutId).exec((err, workout) => {
        if (err) {
            return next(err);
        }

        workout.remove(err => {
            if (err) {
                return next(err);
            }
            res.status(204).end();
        });
    });
}

/*export function updateSchedule(req, res, next) {
    req.checkBody("week", "Number of weeks is required").notEmpty();
    req.checkBody("")

    req.sanitize("week").escape();
    Workout.findById(req.params.id).schedule;
}*/