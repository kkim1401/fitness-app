import Express from "express";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import expressSanitized from "express-sanitize-escape";
import ExerciseInstance from "./models/exerciseInstance"; //Need to import ExerciseInstance so that the model can be added to mongoose.
import workout from "./routes/workout.route";
import exercise from "./routes/exercise.route";
import user from "./routes/user.route";

const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(expressSanitized.middleware());

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

export default app;