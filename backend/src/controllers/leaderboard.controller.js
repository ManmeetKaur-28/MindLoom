import {
    addUserScore,
    incUserScore,
    getTopScorers,
} from "../services/leaderboardService.js";

import { io } from "../app.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Quiz } from "../models/quiz.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Leaderboard } from "../models/leaderboard.model.js";
import { User } from "../models/user.model.js";

const addScore = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "cannot add score to a quiz without logging in"
        );
    }

    const { quizId } = req.params;
    if (!quizId) {
        throw new ApiError(
            400,
            "quiz id is required for aadding score to a quiz"
        );
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given id found to add the score"
        );
    }

    const { score, limit = 10 } = req.body;

    await addUserScore(quizId, userId, score);

    const topUsers = await getTopScorers(quizId, limit);

    io.emit("leaderboardUpdate", { quizId, leaderboard: topUsers });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                topUsers,
                "score added successfully :: leaderboard updated successfully"
            )
        );
});

const incScore = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            400,
            "user id is required for incrementing the score of a quiz"
        );
    }

    const { quizId } = req.params;
    if (!quizId) {
        throw new ApiError(
            400,
            "quiz id is required for incrementing the score of a quiz"
        );
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given id found to increment the score"
        );
    }

    const { delta, limit = 10 } = req.body;
    await incUserScore(quizId, userId, delta);
    const topUsers = await getTopScorers(quizId, limit);

    io.emit("leaderboardUpdate", { quizId, leaderboard: topUsers });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                topUsers,
                "score incremented successfully :: leaderboard updated successfully"
            )
        );
});

const getLeaderboard = asyncHandler(async (req, res, next) => {
    const { quizId } = req.params;
    if (!quizId) {
        throw new ApiError(
            400,
            "quiz id is required for accessing its leaderboard"
        );
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given id found to access its leaderboard"
        );
    }

    const leaderboard = await Leaderboard.findOne({ quizId });
    if (!leaderboard) {
        throw new ApiError(
            404,
            "no leaderboard with given quiz id has been saved now"
        );
    }

    const userScores = await Promise.all(
        leaderboard.userScores.map(async (userScore) => {
            const user = await User.findById(userScore.userId);
            return {
                userId: userScore.userId,
                rank: userScore.rank,
                score: userScore.score,
                fullname: user.fullname,
            };
        })
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, userScores, "leaderboard fetched successfully")
        );
});

export { addScore, incScore, getLeaderboard };
