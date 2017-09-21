import User from "../models/user";
import merge from "merge";

export function getUser(req, res, next) {
    req.doc
        .populate("workouts")
        .populate("exercises")
        .exec((err, user) => {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
}

export function addUser(req, res, next) {
    req.checkBody("name", "Name is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return next(errors);
    }

    const user = new User(req.body);

    user.save((err, saved) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(saved);
    });

}

export function updateUser(req, res, next) {
    const originalUser = req.doc;
    const userFromReqBody = req.body;

    const newUser = merge.recursive(true, originalUser, userFromReqBody);

    newUser.save((err, userInstance) => {
        if (err) {
            return next(err);
        }
        res.json(userInstance);
    });
}

export function deleteUser(req, res, next) {
    req.doc.remove(err => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
}