import Exercise from "../models/exercise";
import User from "../models/user";

export function getExercises(req, res, next) {
    User.findById(req.params["user-id"])
        .populate("exercises")
        .exec((err, userInstance) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.json(userInstance.exercises);
    });
}

export function getExercise(req, res, next) {
    const targetId = req.params["exercise-id"];

    User.findById(req.params["user-id"])
        .populate({path: "exercises", match: {_id: targetId}})
        .exec((err, userInstance) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.json(userInstance.exercises[0]);
    });

    /*Exercise.findById(req.params["exercise-id"])
        .exec((err, result) => {
       if (err) {
           err.status = 404;
           return next(err);
       }
       res.json(result);
    });
    */
}

export function addExercise(req, res, next) {
    req.checkBody("name", "Name of exercise is required").notEmpty();

    req.sanitize("name").escape();
    req.sanitize("description").escape();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    User.findById(req.params["user-id"]).exec((err, userInstance) => {
        if (err) {
            err.status = 404;
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
                res.status(201).json(exerciseInstance);
            });
        });
    });
}

export function deleteExercise(req, res, next) {
    const targetId = req.params["exercise-id"];

    User.findById(req.params["user-id"])
        .exec((err, userInstance) => {
        if (err) {
            err.status = 404;
            return next(err);
        }

        userInstance.exercises = userInstance.exercises.filter(exerciseId => exerciseId !== targetId);
        userInstance.save(err => {
            if (err) {
                return next(err);
            }
            res.status(204).end();
        });
    });

    /*Exercise.findById(id).exec((err, exercise) => {
        if (err) {
            err.status = 404;
            return next(err);
        }

        exercise.remove(err => {
            if (err) {
                return next(err);
            }

            User.findOneAndUpdate({exercises: id}, {$pull: {exercises: targetId}})
                .exec(err => {
                if (err) {
                    return next(err);
                }});

            res.status(204).end();
        });
    });*/
}