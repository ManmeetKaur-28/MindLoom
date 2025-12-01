import mongoose from "mongoose";
const answersDataSchema = new mongoose.Schema({
    qid: {
        type: Number,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    selectedAnswer: {
        type: String,
        default: "",
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
});
const resultSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        },
        rank: {
            type: Number,
        },
        correctQuestions: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        answersData: [answersDataSchema],
    },
    {
        timestamps: true,
    }
);

export const Result = mongoose.model("Result", resultSchema);
