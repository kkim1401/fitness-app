import {Router} from "express";
import {getWorkouts, getWorkout, addWorkout, deleteWorkout} from "../controllers/workout.controller";
const router = Router();

router.route("/users/:user-id/workouts")
    .get(getWorkouts);

router.route("/users/:user-id/workouts/:workout-id")
    .get(getWorkout)
    .post(addWorkout)
    .delete(deleteWorkout);

export default router;




