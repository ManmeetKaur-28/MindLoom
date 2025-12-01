import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";
import { User } from "../models/user.model.js";
import { QuizAssignment } from "../models/quizAssignment.model.js";

const getQuizResult = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    const { id } = req.params;
    if (!id) {
        throw new ApiError(
            400,
            "quiz id is required for accessing its result "
        );
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with given id exists to show its results"
        );
    }
    const quizResult = await Result.findOne({
        $and: [{ quizId: id }, { userId }],
    });
    if (!quizResult) {
        throw new ApiError(
            400,
            "you have not given any quiz with the given id"
        );
    }
    const allQuestions = quiz.allQuestions;
    const answersData = quizResult.answersData;
    const mergedData = allQuestions.map((item) => {
        const answerItem = answersData.find((el) => el.qid === item.qid);

        return {
            qid: item.qid,
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
            explanation: item.explanation,
            time_limit_seconds: item.time_limit_seconds,
            selectedAnswer: answerItem ? answerItem.selectedAnswer : "",
            isCorrect: answerItem ? answerItem.isCorrect : false,
        };
    });

    const responseObj = {
        title: quiz.title,
        type: quiz.type,
        domain: quiz.domain,
        description: quiz.description,
        difficulty: quiz.difficulty,
        mode: quiz.mode,
        attemptedAt: quizResult.createdAt,
        totalQuestions: quiz.totalQuestions,
        duration: quiz.duration,
        participants: quiz.participants,
        score: quizResult.score,
        totalScore: quizResult.totalScore,
        rank: quizResult.rank,
        correctQuestions: quizResult.correctQuestions,
        answersData: mergedData,
    };
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                responseObj,
                "result of given quz fetched successfully"
            )
        );
});

const saveQuizResult = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const userId = req.user?._id;
    const { score, rank = 0, answersData, totalQuestions } = req.body;
    if (!id) {
        throw new ApiError(
            400,
            "quiz id is required for saving the result of a quiz"
        );
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
        throw new ApiError(
            404,
            "no quiz with the given id found , to save the result"
        );
    }
    if (
        score == undefined ||
        totalQuestions == undefined ||
        !Array.isArray(answersData)
    ) {
        throw new ApiError(
            400,
            "all fields are required for saving quiz result"
        );
    }

    const savedResult = await Result.create({
        quizId: id,
        userId,
        score,
        rank,
        answersData,
        totalQuestions,
        correctQuestions: score / 10,
        totalScore: totalQuestions * 10,
    });
    if (!savedResult) {
        throw new ApiError(
            400,
            "error occurred while saving the quiz results to the database"
        );
    }
    const addedxp = Math.round((score / (totalQuestions * 10)) * 100);
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $inc: {
                totalQuizzes: 1,
                xp: addedxp,
            },
        },
        {
            new: true,
        }
    );
    const quizAssig = await QuizAssignment.findOne({
        $and: [{ quizId: id }, { userId }],
    });

    quizAssig.status = "completed";
    await quizAssig.save();

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, {
        $inc: {
            participants: 1,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "quiz result saved successfully to the database"
            )
        );
});

export { saveQuizResult, getQuizResult };
