import {Router} from "express";
import expressSanitized from "express-sanitize-escape";
import {getUser, addUser, deleteUser, updateUser} from "../controllers/user.controller";

const router = Router();
expressSanitized.sanitizeParams(router, ["userId"]);

router.route("/users")
    .post(addUser);

router.route("/users/:userId")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

export default router;