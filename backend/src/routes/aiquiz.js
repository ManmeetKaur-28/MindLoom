import { Router } from "express";
import { OpenAI } from "openai";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const router = Router();
//handling hugging face api
const client = new OpenAI({
    baseURL: process.env.HF_URL,
    apiKey: process.env.HF_ACCESS_TOKEN,
});

router.route("/").post(async (req, res, next) => {
    const {
        title,
        domain,
        difficulty,
        description,
        duration,
        totalQuestions,
        instructions,
    } = req.body;
    const prompt = `You are an expert quiz generator and precise time allocator.

Your task:
Generate a multiple-choice quiz in **pure JSON format** following the exact structure and rules below.

---

### QUIZ DETAILS
{
  "title": ${title},
  "domain": ${domain},
  "difficulty": ${difficulty},
  "description": ${description},
  "totalQuestions": ${totalQuestions},
  "total_duration_seconds": ${duration * 60},
  "instructions":${instructions}
}

---

### REQUIRED OUTPUT FORMAT
[
  {
    "qid": number,
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string",
    "explanation": "string",
    "time_limit_seconds": number
  }
]

---

### STRICT RULES
1. Output **only a valid JSON array** — no markdown, text, or explanations outside it.
2. The array must contain exactly \`totalQuestions\` items.
3. Each question must:
   - Be unique, clear, and relevant to the given domain and difficulty.
   - Contain exactly 4 distinct options.
   - Have a \`correctAnswer\` that exactly matches one of the options.
   - Include a short and accurate \`explanation\` for the answer.
4. **Time Allocation Rules:**
   - If \`total_duration_seconds\` is provided:
     - Divide the \`total_duration_seconds\` **evenly** across all questions.
     - Ensure the sum of all \`time_limit_seconds\` equals \`total_duration_seconds\` exactly.
     -Ensure that the \`total_duration_seconds\` for each question is( total_duration_seconds / totalQuestions)
   - If \`total_duration_seconds\` is **not provided**, assign reasonable times (e.g. 30 - 60 ) automatically to each question based on difficulty.
5. Output must be **valid, machine-readable JSON only** — no extra words, comments, or markdown formatting.
6. Output **only the array of questions** — do not include quiz details or any other text.
7. The correctAnswer of a question has to be present in the options of that particular question.
8. The correctAnswer of each question has to strictly match to one of the options of that question. Nothing other than 4 options can be made the correctAnswer.

---

Now generate the quiz strictly following these rules and output only the JSON array.

    `;

    try {
        const completion = await client.chat.completions.create({
            model: "meta-llama/Meta-Llama-3-8B-Instruct:novita",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 3000, //check it
        });

        console.log(completion); //========
        console.log(typeof completion); //========

        const rawOutput = completion.choices[0].message.content.trim();
        const jsonStart = rawOutput.indexOf("[");
        const jsonEnd = rawOutput.lastIndexOf("]");

        const jsonString = rawOutput.slice(jsonStart, jsonEnd + 1);

        console.log(jsonString); //======
        console.log(typeof jsonString); //======

        const quizData = await JSON.parse(jsonString);

        console.log("quiz successfully created"); //====
        console.log(quizData); //====
        console.log(typeof quizData); //====

        return res
            .status(200)
            .json(
                new ApiResponse(200, quizData, "ai quiz generated successfully")
            );
    } catch (error) {
        console.log(
            "error occured while generating the ai quiz",
            error.message
        );
        throw new ApiError(400, "error occured while generating the ai quiz");
    }
});

export default router;
