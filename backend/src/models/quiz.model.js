import mongoose from "mongoose";
import { nanoid } from "nanoid";
const questionSchema = new mongoose.Schema({
    qid: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
            trim: true,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
        trim: true,
    },
    explanation: {
        type: String,
    },
    time_limit_seconds: {
        type: Number,
        required: true,
    },
});
const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["ai", "manual"],
        },
        domain: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard"],
        },
        description: {
            type: String,
        },
        mode: {
            type: String,
            enum: ["live", "async"],
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        participants: {
            type: Number,
            default: 0,
        },
        allQuestions: [questionSchema],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        joinCode: {
            type: String,
            unique: true,
            default: () => nanoid(10),
        },
    },
    {
        timestamps: true,
    }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
