import client from "../redis/redisClient.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

async function addUserScore(quizId, userId, score) {
    const key = `leaderboard:${quizId}`;
    await client.zAdd(key, [{ score, value: userId.toString() }]);
}

async function incUserScore(quizId, userId, delta) {
    const key = `leaderboard:${quizId}`;
    await client.zIncrBy(key, delta, userId.toString());
}

async function getTopScorers(quizId, limit = 10) {
    const key = `leaderboard:${quizId}`;

    const results = await client.zRangeWithScores(key, 0, limit - 1, {
        REV: true,
    });

    const userIds = results.map(
        (entry) => new mongoose.Types.ObjectId(entry.value)
    );

    const users = await User.find({ _id: { $in: userIds } }).select("fullname");

    const userMap = {};
    users.forEach((u) => {
        userMap[u._id.toString()] = u.fullname;
    });

    return results.map((item, index) => ({
        rank: index + 1,
        score: item.score,
        userId: item.value,
        fullname: userMap[item.value] || "Unknown",
    }));
}

export { incUserScore, addUserScore, getTopScorers };
