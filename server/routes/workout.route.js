import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getWorkouts, getWorkout, addWorkout, deleteWorkout} from "../controllers/workout.controller";

const router = Router();
expressSanitized.sanitizeParams(router, ["userId", "workoutId"]);

router.route("/users/:userId/workouts")
    .get(getWorkouts);

router.route("/users/:userId/workouts/:workoutId")
    .get(getWorkout)
    .post(addWorkout)
    .delete(deleteWorkout);

export default router;




