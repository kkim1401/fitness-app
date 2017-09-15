import {Router} from "express";
import {getExercises, getExercise, addExercise, deleteExercise} from "../controllers/exercise.controller";
const router = new Router();

router.route("/users/:user-id/exercises")
    .get(getExercises)
    .post(addExercise);

router.route("/users/:user-id/exercises/:exercise-id")
    .get(getExercise)
    .delete(deleteExercise);

export default router;