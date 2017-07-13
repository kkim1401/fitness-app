import Exercise from "../models/exercise";
import User from "../models/user";

export function getExercises(req, res, next) {
    User.findById(req.params.user)
        .populate("exercises")
        .exec((err, userInstance) => {
        if (err) {
            return next(err);
        }
        res.send(userInstance.exercises);
        });
}

export function getExercise(req, res, next) {
    Exercise.findById(req.params.id).exec((err, result) => {
       if (err) {
           return next(err);
       }
       res.send(result);
    });
}

export function addExercise(req, res, next) {
    req.checkBody("name", "Name of exercise is required").notEmpty();

    req.sanitize("name").escape();
    req.sanitize("description").escape();

    const errors = req.validationErrors();
    if (errors) {
        return console.log(errors);
    }

    User.findById(req.params.user).exec((err, userInstance) => {
        if (err) {
            return next(err);
        }

        const exercise = new Exercise({
            name: req.body.name,
            description: req.body.description,
        });

        exercise.save((err, exerciseInstance) => {
            if (err) {
                return next(err);
            }
            userInstance.exercises.push(exerciseInstance._id);
            userInstance.save(err => {
                if (err) {
                    return next(err);
                }
                res.send(exercise);
            })
        });
    });
}

export function deleteExercise(req, res, next) {
    const id = req.params.id;
    Exercise.findById(id).exec((err, exercise) => {
        if (err) {
            return next(err);
        }

        exercise.remove((err, deleted) => {
            if (err) {
                return next(err);
            }

            User.findOneAndUpdate({exercises: id}, {$pull: {exercises: id}})
                .exec(err => {
                if (err) {
                    return next(err);
                }});

            res.send(deleted);
        });
    });
}