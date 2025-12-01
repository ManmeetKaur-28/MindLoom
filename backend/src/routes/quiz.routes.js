import { Router } from "express";
import {
    addQuiz,
    getAllQuizInfo,
    getQuizInfo,
    registerForQuiz,
    registerPreview,
} from "../controllers/quiz.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.route("/:id").get(verifyJWT, getQuizInfo);
router.route("/preview/:joinCode").get(registerPreview);
router.route("/add").post(verifyJWT, addQuiz);
router.route("/join/:joinCode").post(verifyJWT, registerForQuiz);
router.route("/all/:id").get(verifyJWT, getAllQuizInfo);
export default router;
