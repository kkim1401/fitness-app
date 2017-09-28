import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getWorkouts, getWorkout, addWorkout, deleteWorkout} from "../controllers/workout.controller";
import lookUp from "../middlewares/lookUp";
import Workout from "../models/workout";
import User from "../models/user";

const router = Router();
expressSanitized.sanitizeParams(router, ["id"]);

router.use("/users/:id/workouts", lookUp(User));
router.use("/workouts/:id", lookUp(Workout));

router.route("/users/:id/workouts")
    .get(getWorkouts)
    .post(addWorkout);

router.route("/workouts/:id")
    .get(getWorkout)
    .delete(deleteWorkout);

export default router;




