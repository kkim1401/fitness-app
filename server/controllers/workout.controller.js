import Workout from "../models/workout";
import mongoose from "mongoose";

const deepPopulate = require('mongoose-deep-populate')(mongoose);

export function getWorkouts(req, res, next) {
    req.doc
        .deepPopulate("workouts.schedule.weeks.days.exerciseList.exercise")
        .exec((err, user) => {
        if (err) {
            return next(err);
        }
        res.json(user.workouts);
    });
}

export function getWorkout(req, res, next) {
    req.doc
        .deepPopulate("schedule.weeks.days.exerciseList.exercise")
        .exec((err, workout) => {
        if (err) {
            return next(err);
        }
        res.json(workout);
    });
}

export function addWorkout(req, res, next) {
    req.checkBody("name", "Name of workout is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const workout = new Workout(req.body);

    workout.save((err, workout) => {
        if (err) {
            return next(err);
        }

        const user = req.doc;

        user.workouts.push(workout._id);

        user.save(err => {
            if (err) {
                return next(err);
            }
            res.status(201).json(workout);
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

/*export function updateSchedule(req, res, next) {
    req.checkBody("week", "Number of weeks is required").notEmpty();
    req.checkBody("")

    req.sanitize("week").escape();
}*/