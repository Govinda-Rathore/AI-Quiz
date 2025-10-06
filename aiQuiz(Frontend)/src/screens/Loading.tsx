import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { generateQuiz } from "../services/aiService";
import { Loader2 } from "lucide-react";

const Loading = () => {
  const { topic, setQuestions, setUserAnswers } = useQuiz();
  const navigate = useNavigate();
// console.log("...");
  useEffect(() => {
    const loadQuiz = async () => {
      if (!topic) {
        navigate("/");
        return;
      }

      try {
        console.log("loading");
        const questions = await generateQuiz(topic);
        setQuestions(questions);
        setUserAnswers(new Array(questions.length).fill(null));
        navigate("/quiz");
      } catch (error) {
        console.error("Failed to generate quiz:", error);
        navigate("/");
      }
    };

    loadQuiz();
  }, [topic, navigate, setQuestions, setUserAnswers]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="text-center space-y-6 ">
        <Loader2 className="w-16 h-16 animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold ">
            Generating Your Quiz
          </h2>
          <p>
            AI is creating personalized questions about {topic}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
