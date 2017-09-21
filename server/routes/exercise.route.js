import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import lookUp from "../middlewares/lookUp";
import Exercise from "../models/exercise";
import User from "../models/user";
import {getExercises, getExercise, addExercise, deleteExercise} from "../controllers/exercise.controller";

const router = Router();
expressSanitized.sanitizeParams(router, "id");

router.use("/users/:id/exercises", lookUp(User));
router.use("/exercises/:id", lookUp(Exercise));

router.route("/users/:id/exercises")
    .get(getExercises)
    .post(addExercise);

router.route("/exercises/:id")
    .get(getExercise)
    .delete(deleteExercise);

export default router;