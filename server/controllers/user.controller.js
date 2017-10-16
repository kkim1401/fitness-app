import User from "../models/user";

export function getUser(req, res) {
    req.doc.populate([{path: "workouts"}, {path: "exercises"}],
        (err, user) => {
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

    user.save((err, user) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(user);
    });
}

export function updateUser(req, res, next) {
    const user = req.doc;
    const updatedTraits = req.body;

    for (const trait in updatedTraits) {
        if (updatedTraits.hasOwnProperty(trait)) {
            if (trait === "squat" || trait === "bench" || trait === "deadlift") {
                user.maxes[trait] = updatedTraits[trait];
            }
            else {
                user[trait] = updatedTraits[trait];
            }
        }
    }

    user.save((err, user) => {
        if (err) {
            return next(err);
        }
        res.json(user);
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