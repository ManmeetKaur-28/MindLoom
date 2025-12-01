import mongoose from "mongoose";
const userScoresSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
    },
});
const leaderboardSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        userScores: [userScoresSchema],
    },
    {
        timestamps: true,
    }
);

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
