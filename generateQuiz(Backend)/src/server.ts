import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface OpenAIResponse {
  questions: Question[];
}

app.post("/api/generate-quiz", async (req: Request, res: Response) => {
  const { topic } = req.body;
  console.log("📩 Topic received:", topic);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a quiz generator. Return ONLY valid JSON matching this schema: { questions: [{ question: string, options: string[], answer: string }] }",
          },
          {
            role: "user",
            content: `Generate exactly 5 MCQs about ${topic}. Each question must have 4 options and 1 correct answer.`,
          },
        ],
        temperature: 0.7,
        // ✅ Forces JSON output, avoids markdown issues
        response_format: { type: "json_object" },
      }),
    });

    const data: any = await response.json();
    // console.log("📨 Raw OpenAI response:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;

    console.log("\n Content=> \n")
    console.log(content)


    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    const quiz = JSON.parse(content) as OpenAIResponse;
    console.log("\n quiz \n")
    console.log(quiz)
    res.json(quiz);
  } catch (err) {
    console.error("❌ Error generating quiz:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});


app.post("/api/quiz-feedback", async (req: Request, res: Response) => {
  const { score, total, topic } = req.body;

  if (score === undefined || total === undefined || !topic) {
    return res.status(400).json({ error: "Missing required fields: score, total, topic" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a quiz evaluator. Return ONLY valid JSON with this schema: { feedback: string }",
          },
          {
            role: "user",
            content: `The user scored ${score} out of ${total} on a quiz about ${topic}. Generate a short motivational feedback message. Mention their performance level and encourage improvement.`,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }, // ensures strict JSON
      }),
    });

    const data: any = await response.json();
    console.log("📨 Feedback raw response:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;
    console.log("\nContent=> \n")
    console.log(content);
    if (!content) {
      throw new Error("No feedback returned from OpenAI");
    }

    const feedbackData = JSON.parse(content) as { feedback: string };
    res.json(feedbackData);
  } catch (err) {
    console.error("❌ Error generating feedback:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
