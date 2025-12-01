import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import {
    getQuizResult,
    saveQuizResult,
} from "../controllers/result.controller.js";

const router = Router();

router
    .route("/:id")
    .get(verifyJWT, getQuizResult)
    .post(verifyJWT, saveQuizResult);
export default router;
