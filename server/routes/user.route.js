import {Router} from "express";
import {getUser, addUser, deleteUser, updateUser} from "../controllers/user.controller";
const router = Router();

router.route("/users")
    .post(addUser);

router.route("/users/:userId")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

export default router;