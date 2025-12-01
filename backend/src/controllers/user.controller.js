import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";
import { QuizAssignment } from "../models/quizAssignment.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });
        return { refreshToken, accessToken };
    } catch (error) {
        throw new ApiError(
            400,
            "error occured while generating access and refresh tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((item) => item?.trim == "")) {
        throw new ApiError(
            400,
            "all the fields are required for registering the user on the platform"
        );
    }
    const existingUser = await User.findOne({
        email,
    });
    if (existingUser) {
        throw new ApiError(400, "user with the same email id already exists");
    }

    const newUser = await User.create({
        fullname,
        email,
        password,
    });

    if (!newUser) {
        throw new ApiError(
            400,
            "error occurred while registering user to the database"
        );
    }

    const response = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .json(new ApiResponse(200, response, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if ([email, password].some((item) => item?.trim() == "")) {
        throw new ApiError(
            400,
            "email and password are required for logging in"
        );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new ApiError(
            404,
            "no account with the given email exists , try logging in with another email"
        );
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "invalid password entered while logging into your account"
        );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        existingUser._id
    );

    const user = await User.findById(existingUser._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, user, "user logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "unauthorized request for logging out");
    }
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const getUserInfo = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            400,
            "user id is required for accessing the user details"
        );
    }
    const user = await User.findById(userId).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "user information fetched successfully")
        );
});

const getActiveQuizzes = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request for getting the active quizzes"
        );
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(
            404,
            "no user with the given id found , trying to access the active quizzes"
        );
    }
    const activeQuizzes = await QuizAssignment.find({
        $and: [{ userId }, { deadline: { $gte: new Date() } }],
    })
        .populate("quizId")
        .select("quizId status");

    if (!activeQuizzes) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], "no active quizzes yet"));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                activeQuizzes,
                "user's active quizzes fetched successfully "
            )
        );
});

const getCreatedQuizzes = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request for accessing the created quizzes"
        );
    }
    const createdQuizzes = await Quiz.find({ createdBy: userId }).select(
        "-createdBy -allQuestions"
    );
    if (createdQuizzes.length == 0) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, [], "you have not created any quiz yet")
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    createdQuizzes,
                    "quizzes created by the user fetched successfully"
                )
            );
    }
});

const getPrevQuizzes = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "user Id is required for accessing you previous quizzes :: unauthorized request"
        );
    }

    const prevResults = await Result.find({ userId });
    if (!Array.isArray(prevResults) || prevResults.length == 0) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "you have no previous quizzes to show")
            );
    }

    const prevQuizzes = await Promise.all(
        prevResults.map(async (resultItem) => {
            const quizItem = await Quiz.findById(resultItem.quizId);
            return {
                title: quizItem.title,
                difficulty: quizItem.difficulty,
                domain: quizItem.domain,
                quizId: resultItem.quizId,
                score: resultItem.score,
                totalScore: resultItem.totalScore,
                correctQuestions: resultItem.correctQuestions,
                totalQuestions: resultItem.totalQuestions,
                rank: resultItem.rank,
                attemptedDate: resultItem.createdAt,
            };
        })
    );
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                prevQuizzes,
                "previous quizzes of user fetched successfully"
            )
        );
});

const changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(
            400,
            "both old and new password fields are required for resetting the password"
        );
    }

    const userId = req.user?._id;
    const user = await User.findById(userId);

    const isPsswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPsswordValid) {
        throw new ApiError(
            401,
            "old password is incorrect ... enter correct old password to reset it"
        );
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: true });

    const newUser = await User.findById(userId).select(
        "-refreshToken -password"
    );

    return res
        .status(200)
        .json(new ApiResponse(200, newUser, "password updated successfully"));
});

const updatefullname = asyncHandler(async (req, res, next) => {
    const { fullname } = req.body;
    if (fullname?.trim() == "") {
        throw new ApiError(400, "cannot set fullname to empty field");
    }
    const userId = req.user?._id;
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                fullname,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "user fullname updated successfully"));
});

const checkLogin = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .json(new ApiResponse(200, true, "user is logged in"));
});

export {
    registerUser,
    checkLogin,
    loginUser,
    logoutUser,
    getUserInfo,
    getActiveQuizzes,
    getCreatedQuizzes,
    changePassword,
    updatefullname,
    getPrevQuizzes,
};
