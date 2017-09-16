import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getExercises, getExercise, addExercise, deleteExercise} from "../controllers/exercise.controller";

const router = Router();
expressSanitized.sanitizeParams(router, ["userId", "exerciseId"]);

router.route("/users/:userId/exercises")
    .get(getExercises)
    .post(addExercise);

router.route("/users/:userId/exercises/:exerciseId")
    .get(getExercise)
    .delete(deleteExercise);

export default router;