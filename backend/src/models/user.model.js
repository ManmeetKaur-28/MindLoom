import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        totalQuizzes: {
            type: Number,
            default: 0,
        },
        quizzesWon: {
            type: Number,
            default: 0,
        },
        xp: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//methods on userSchema

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    else {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
}); //cannot use arrow function here because we need access to this i.e. current context

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
export const User = mongoose.model("User", userSchema);
