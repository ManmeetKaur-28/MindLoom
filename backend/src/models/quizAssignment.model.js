import mongoose from "mongoose";

const quizAssignmentSchema = new mongoose.Schema(
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
        deadline: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const QuizAssignment = mongoose.model(
    "QuizAssignment",
    quizAssignmentSchema
);
