import { Router } from "express";
import {
    addScore,
    incScore,
    getLeaderboard,
} from "../controllers/leaderboard.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
const router = Router();

// router.route("/ping-redis").get(async (req, res, next) => {
//     try {
//         await client.set("name", "manmeet");
//         const name = await client.get("name");
//         res.send(`redis says ${name}`);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(`redis showing error on pinging ::${error} `);
//     }
// });

router.route("/:quizId/score").post(verifyJWT, addScore);

router.route("/:quizId/increment").post(verifyJWT, incScore);

router.route("/:quizId").get(getLeaderboard);

export default router;
