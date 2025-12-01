import mongoose from "mongoose";
import { Leaderboard } from "../models/leaderboard.model.js";
import { Quiz } from "../models/quiz.model.js";
import { getTopScorers } from "../services/leaderboardService.js";
import { Result } from "../models/result.model.js";
import { User } from "../models/user.model.js";

export async function saveLeaderboard(quizId) {
    if (!quizId) {
        return;
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return;

    let leaderboard = await Leaderboard.findOne({ quizId });

    if (leaderboard) return;

    leaderboard = await getTopScorers(quizId, 0);

    const userScores = leaderboard.map((item) => ({
        score: item.score,
        rank: item.rank,
        userId: new mongoose.Types.ObjectId(item.userId),
    }));

    await Leaderboard.create({
        quizId,
        userScores,
    });

    const ops = userScores.map((item) => ({
        updateOne: {
            filter: { quizId, userId: item.userId },
            update: { $set: { rank: item.rank } },
        },
    }));

    if (ops.length > 0) {
        await Result.bulkWrite(ops);
    }

    if (userScores.length > 0) {
        await User.findByIdAndUpdate(userScores[0].userId, {
            $inc: {
                quizzesWon: 1,
            },
        });
    }
    if (userScores.length > 1) {
        await User.findByIdAndUpdate(userScores[1].userId, {
            $inc: {
                quizzesWon: 1,
            },
        });
    }

    if (userScores.length > 2) {
        await User.findByIdAndUpdate(userScores[2].userId, {
            $inc: {
                quizzesWon: 1,
            },
        });
    }
}
