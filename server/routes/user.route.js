import {Router} from "express";
import {getUser, addUser, deleteUser, updateUser} from "../controllers/user.controller";
const router = Router();

router.route("/users")
    .post(addUser);

router.route("/users/:id")
    .get(getUser)
    .delete(deleteUser);

router.route("/users/update/:id").post(updateUser);

export default router;