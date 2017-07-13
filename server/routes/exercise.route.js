import {Router} from "express";
import {getExercises, getExercise, addExercise, deleteExercise} from "../controllers/exercise.controller";
const router = new Router();

router.route("/:user/exercises")
    .get(getExercises)
    .post(addExercise);

router.route("/exercises/:id")
    .get(getExercise)
    .delete(deleteExercise);

export default router;