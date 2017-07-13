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
    const err = new Error("Not found");
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status + " error");
});

app.listen(serverConfig.port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`Running on port ${serverConfig.port}!`);
});

export default app;