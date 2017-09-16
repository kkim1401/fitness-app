import User from "../models/user";
import Workout from "../models/workout";

export function getUser(req, res, next) {
    User.findById(req.params.userId)
        .populate("workouts")
        .populate("exercises")
        .exec((err, result) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.json(result);
    });
}

export function addUser(req, res, next) {
    req.checkBody("name", "Name is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const user = new User({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        maxes: {
            squat: req.body.squat,
            bench: req.body.bench,
            deadlift: req.body.deadlift
        }
    });

    user.save((err, saved) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(saved);
    });

}

export function updateUser(req, res, next) {
    User.findById(req.params.userId).exec((err, user) => {
        if (err) {
            err.status = 404;
            return next(err);
        }

        arrayOfTraits.forEach(trait => {
            if (trait === "squat" || trait === "bench" || trait === "deadlift") {
                user.maxes[trait] = req.body[trait];
            }
            else {
                user[trait] = req.body[trait];
            }});

        user.save((err, saved) => {
            if (err) {
                return next(err);
            }
            res.json(saved);
        });
    });
}

export function deleteUser(req, res, next) {
    User.findById(req.params.userId).exec((err, user) => {
        if (err) {
            err.status = 404;
            return next(err);
        }

        user.remove(err => {
            if (err) {
                return next(err);
            }
            res.status(204).end();
        });
    });
}