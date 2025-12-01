import { saveLeaderboard } from "./saveLeaderboard.js";
import { Quiz } from "../models/quiz.model.js";

export async function scheduleSaveLeaderboard(quizId) {
    if (!quizId) return;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return;
    const endTime = new Date(
        quiz.deadline.getTime() + quiz.duration * 60 * 1000
    );
    const delayMs = Math.max(0, endTime.getTime() - Date.now() + 20000);

    setTimeout(() => saveLeaderboard(quizId), delayMs);
}
