import Express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import serverConfig from "./config";
import workout from "./routes/workout.route";
import exercise from "./routes/exercise.route";
import user from "./routes/user.route";

const app = Express();

mongoose.connect(serverConfig.mongoURL, err => {
    if (err) {
        return console.error(err);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use("/api", [exercise, workout, user]);

app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    next(err);
});

app.use((err, req, res, next) => {
    //If err is an array, it is the result of validating req body with express-validator.
    res.sendStatus(Array.isArray(err) ? 400 : err.status || 500);
});

app.listen(serverConfig.port, () => {
    console.log(`Running on port ${serverConfig.port}!`);
});

export default app;