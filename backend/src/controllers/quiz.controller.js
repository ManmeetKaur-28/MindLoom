import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Quiz } from "../models/quiz.model.js";
import { QuizAssignment } from "../models/quizAssignment.model.js";
import mongoose from "mongoose";
import { scheduleSaveLeaderboard } from "../utils/scheduleSaveLeaderboard.js";
const getQuizInfo = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "you need to register first to play the quiz");
    }
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "quiz id is required for accessing the quiz");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            400,
            "invalid quiz id entered when accessing its information"
        );
    }

    const quizInfo = await Quiz.findById(id);
    if (!quizInfo) {
        throw new ApiError(
            400,
            "no quiz with the given id exists to display its information"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                quizInfo,
                "quiz information fetched successfully"
            )
        );
});

const addQuiz = asyncHandler(async (req, res, next) => {
    const {
        type,
        title,
        domain,
        difficulty,
        description,
        mode,
        deadline,
        duration,
        allQuestions,
        totalQuestions,
    } = req.body;
    if (
        [type, title, domain, difficulty, mode].some(
            (item) => item?.trim() == ""
        )
    ) {
        throw new ApiError(
            400,
            "all the fields are required for creating a quiz"
        );
    }
    const deadlineDate = new Date(deadline);

    if (isNaN(deadlineDate.getTime())) {
        throw new ApiError(400, "invalid deadline entered for quiz");
    }
    if (!Array.isArray(allQuestions) || allQuestions.length == 0) {
        throw new ApiError(400, "cannot create a quiz having 0 questions");
    }

    const userId = req.user?._id;
    const quiz = await Quiz.create({
        type,
        title,
        domain,
        difficulty,
        description,
        mode,
        deadline: deadlineDate,
        allQuestions,
        duration,
        createdBy: userId,
        totalQuestions,
    });

    if (!quiz) {
        throw new ApiError(400, "error occured while saving quiz to database");
    }

    await scheduleSaveLeaderboard(quiz._id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                quiz.joinCode,
                "quiz successfully added to database"
            )
        );
});

const registerForQuiz = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "you need to login to register to a quiz");
    }
    const { joinCode } = req.params;
    if (!joinCode) {
        throw new ApiError(
            400,
            "cannot register for a quiz without its join code"
        );
    }

    const quiz = await Quiz.findOne({ joinCode });
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given quiz id exists that you are trying to register"
        );
    }

    const existingAssignment = await QuizAssignment.findOne({
        $and: [{ quizId: quiz._id }, { userId }],
    });

    if (existingAssignment) {
        throw new ApiError(400, "User has already registered for the quiz !");
    }

    const createdAssignment = await QuizAssignment.create({
        quizId: quiz._id,
        userId,
        deadline: quiz.deadline,
    });

    if (!createdAssignment) {
        throw new ApiError(
            400,
            "error occured while registering the user for the quiz"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdAssignment,
                "user has been successfully registered for the quiz"
            )
        );
});

const registerPreview = asyncHandler(async (req, res, next) => {
    const { joinCode } = req.params;
    if (!joinCode) {
        throw new ApiError(
            400,
            "quiz join code is required for accessing its preview"
        );
    }
    const quizInfo = await Quiz.findOne({ joinCode }).select(
        "-createdBy -joinCode"
    );
    if (!quizInfo) {
        throw new ApiError(404, "no quiz with the given join code found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                quizInfo,
                "preview of the quiz fetched successfully with the join code"
            )
        );
});

const getAllQuizInfo = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "you need to login to access the information of the quiz"
        );
    }
    const { id } = req.params;
    if (!id) {
        throw new ApiError(
            400,
            "quiz id is required to access all quiz information"
        );
    }
    const quiz = await Quiz.findById(id);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given id found to access all its information"
        );
    }
    if (!quiz.createdBy.equals(userId)) {
        throw new ApiError(
            401,
            "only user who has created the quiz can access all its information"
        );
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                quiz,
                "all information of the quiz fetched successfully"
            )
        );
});

export {
    getQuizInfo,
    addQuiz,
    registerForQuiz,
    registerPreview,
    getAllQuizInfo,
};
