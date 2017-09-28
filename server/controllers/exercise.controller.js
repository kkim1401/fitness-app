import Exercise from "../models/exercise";
import User from "../models/user";

export function getExercises(req, res) {
    User.populate(req.doc, {path: "exercises"},
        (err, user) => {
        res.json(user.exercises);
    });
}

export function getExercise(req, res) {
    res.json(req.doc);
}

export function addExercise(req, res, next) {
    req.checkBody("name", "Name of exercise is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const user = req.doc;

    const exercise = new Exercise({
        name: req.body.name,
        description: req.body.description,
    });

    exercise.save((err, exerciseInstance) => {
        if (err) {
            return next(err);
        }

        user.exercises.push(exerciseInstance._id);

        user.save(err => {
            if (err) {
                return next(err);
            }
            res.status(201).json(exerciseInstance);
        });
    });
}

export function deleteExercise(req, res, next) {
    req.doc.remove(err => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
}