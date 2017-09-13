import {Router} from "express";
import {getUser, addUser, deleteUser, updateUser} from "../controllers/user.controller";
const router = Router();

router.route("/users")
    .post(addUser);

router.route("/users/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;