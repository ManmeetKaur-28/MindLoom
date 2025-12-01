import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import {
    changePassword,
    getActiveQuizzes,
    getCreatedQuizzes,
    getPrevQuizzes,
    getUserInfo,
    loginUser,
    logoutUser,
    registerUser,
    updatefullname,
    checkLogin,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/").get(verifyJWT, getUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);

router.route("/active-quizzes").get(verifyJWT, getActiveQuizzes);
router.route("/created-quizzes").get(verifyJWT, getCreatedQuizzes);
router.route("/prev-quizzes").get(verifyJWT, getPrevQuizzes);

router.route("/edit/password").patch(verifyJWT, changePassword);
router.route("/edit/fullname").patch(verifyJWT, updatefullname);
router.route("/checkLogin").get(verifyJWT, checkLogin);
export default router;
