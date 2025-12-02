import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_HOME_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//routes handling

import userRouter from "./routes/user.routes.js";
import quizRouter from "./routes/quiz.routes.js";
import resultRouter from "./routes/result.routes.js";
import aiRouter from "./routes/aiquiz.js";
import leaderboardRouter from "./routes/leaderboard.routes.js";
//routes declaration

app.use("/api/v1/user", userRouter);

app.use("/api/v1/quiz", quizRouter);

app.use("/api/v1/result", resultRouter);

app.use("/api/v1/generate-quiz", aiRouter);

app.use("/api/v1/leaderboard", leaderboardRouter);

//http server
const server = http.createServer(app);

//socket io - Server - io
const io = new Server(server, { cors: { origin: "*" } });

//io methods
io.on("connection", (socket) => {
    console.log("client connected : ", socket.id);
    // console.log(socket);
});

export { io };

//exporting http server
export default server;
