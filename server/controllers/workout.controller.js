import Workout from "../models/workout";
import Exercise from "../models/exercise";
import User from "../models/user";

export function getWorkouts(req, res, next) {
    Workout.find().sort({name: 1}).exec((err, result) => {
        if (err) {
            return next(err);
        }
        res.send(result);
    });
}

export function getWorkout(req, res, next) {
    Workout.findById(req.params.id).populate("schedule.days.exerciseList.exercise").exec((err, result) => {
        if (err) {
            return next(err);
        }
        res.send(result);
    });
}

export function addWorkout(req, res, next) {
    req.checkBody("name", "Name of workout is required").notEmpty();

    req.sanitize("name").escape();
    req.sanitize("description").escape();
    req.sanitize("schedule").escape();

    const workout = new Workout(req.body);

    const errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    }
    else {
        workout.save(err => {
            if (err) {
                return next(err);
            }
            res.end();
        })
    }
}

export function deleteWorkout(req, res, next) {
    Workout.findById(req.params.id).exec((err, workout) => {
        if (err) {
            return next(err);
        }
        workout.remove(() => {
            res.end();
        });
    });
}

/*export function updateSchedule(req, res, next) {
    req.checkBody("week", "Number of weeks is required").notEmpty();
    req.checkBody("")

    req.sanitize("week").escape();
    Workout.findById(req.params.id).schedule;
}*/