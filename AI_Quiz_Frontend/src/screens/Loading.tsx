import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { generateQuiz } from "../services/aiService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Loading = () => {
  const { topic, setQuestions, setUserAnswers } = useQuiz();
  const navigate = useNavigate();
  const hasLoaded = useRef(false);
// console.log("...");
  useEffect(() => {
    const loadQuiz = async () => {
      if (!topic) {
        toast.error("No topic selected. Redirecting home.");
        setTimeout(() => navigate("/"), 1500);
        return;
      }


      try {
        console.log("loading");
        const questions = await generateQuiz(topic);
        setQuestions(questions);
        setUserAnswers(new Array(questions.length).fill(null));
        toast.success("Your quiz is ready!");
        setTimeout(() => navigate("/quiz"), 1000);
      } catch (error) {
        console.error("Failed to generate quiz:", error);
        toast.error("AI failed to generate a quiz. Please try again.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadQuiz();
    }
  }, [topic, navigate, setQuestions, setUserAnswers]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center bg-plum-gradient text-white">
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
