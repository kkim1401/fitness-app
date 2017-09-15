import {Router} from "express";
import {getExercises, getExercise, addExercise, deleteExercise} from "../controllers/exercise.controller";
const router = Router();

router.route("/users/:userId/exercises")
    .get(getExercises)
    .post(addExercise);

router.route("/users/:userId/exercises/:exerciseId")
    .get(getExercise)
    .delete(deleteExercise);

export default router;