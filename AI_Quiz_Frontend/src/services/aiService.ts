
export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  answer: string;
}


export async function generateQuiz(topic: string): Promise<QuizQuestion[]> {

  try {
    const res = await fetch("http://localhost:5000/api/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    if (!res.ok) throw new Error("Failed to generate quiz");
    const data = await res.json();
    // console.log(" \naiService Data=> \n")
    // console.log(data.questions)
    return data.questions;
  } catch (err) {
    throw err;
  }
}

export const generateFeedback = async (
  score: number,
  total: number,
  topic: string
): Promise<string> => {
  try {
    const res = await fetch("http://localhost:5000/api/quiz-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, total, topic }),
    });
    if (!res.ok) throw new Error("Failed to generate feedback");
    const data = await res.json();
    // console.log("\nFeedback=>\n")
    // console.log(data.feedback)
    return data.feedback;

  } catch (err) {
    return "Unable to generate feedback at the moment.";
  }
}
