import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getWorkouts, getWorkout, addWorkout, deleteWorkout} from "../controllers/workout.controller";
import lookUp from "../middlewares/lookUp";
import Workout from "../models/workout";
import User from "../models/user";

const router = Router();
expressSanitized.sanitizeParams(router, "id");

//lookUp searches for params.id of the passed-in Model;
router.route("/users/:id/workouts")
    .get(lookUp(User), getWorkouts)
    .post(lookUp(User), addWorkout);

router.route("/workouts/:id")
    .get(lookUp(Workout), getWorkout)
    .delete(lookUp(Workout), deleteWorkout);

export default router;




