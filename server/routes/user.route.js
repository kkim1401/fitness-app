import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getUser, addUser, deleteUser, updateUser} from "../controllers/user.controller";
import User from "../models/user";
import lookUp from "../middlewares/lookUp";

const router = Router();
expressSanitized.sanitizeParams(router, ["id"]);

//Middleware to remove dependencies.
router.use("/users/:id", lookUp(User));

router.route("/users")
    .post(addUser);

router.route("/users/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

export default router;