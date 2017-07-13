import User from "../models/user";
import Workout from "../models/workout";

export function getUser(req, res, next) {
    User.findById(req.params.id)
        .populate("workouts")
        .populate("exercises")
        .exec((err, result) => {
        if (err) {
            return next(err);
        }
        res.send(result);
    });
}

export function addUser(req, res, next) {
    req.checkBody("name", "Name is required").notEmpty();

    req.sanitize("gender").escape();
    req.sanitize("age").escape();
    req.sanitize("squat").escape();
    req.sanitize("bench").escape();
    req.sanitize("deadlift").escape();

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

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    user.save((err, saved) => {
        if (err) {
            return next(err);
        }
        res.send(saved);
    });

}

export function updateUser(req, res, next) {
    const arrayOfTraits = Object.keys(req.body);
    arrayOfTraits.forEach(trait => {
        req.sanitize(trait).escape();
    });

    const errors = req.validationErrors();
    if (errors) {
        return console.log(errors);
    }

    User.findById(req.params.id).exec((err, user) => {
        if (err) {
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
            res.send(saved);
        });
    });
}

export function deleteUser(req, res, next) {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            return next(err);
        }
        user.remove(() => {
            res.end();
        });
    });
}