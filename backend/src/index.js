import "dotenv/config";
import server from "./app.js";

import connectDB from "./db/dbConnection.js";
import { Quiz } from "./models/quiz.model.js";
import { scheduleSaveLeaderboard } from "./utils/scheduleSaveLeaderboard.js";

connectDB()
    .then(async () => {
        const quizzes = await Quiz.find().select("_id");
        quizzes.forEach(async (quiz) => {
            await scheduleSaveLeaderboard(quiz._id);
        });
        server.listen(process.env.PORT || 4000, () => {
            console.log("server is successfully listening on port ");
        });
    })
    .catch(() => {
        console.log("mongodb connection failed in index file");
    });
