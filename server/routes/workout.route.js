import {Router} from "express";
import {getWorkouts, getWorkout, addWorkout, deleteWorkout} from "../controllers/workout.controller";
const router = Router();

router.route("/workouts")
    .get(getWorkouts);

router.route("/workouts/:id")
    .get(getWorkout)
    .post(addWorkout)
    .delete(deleteWorkout);

export default router;




