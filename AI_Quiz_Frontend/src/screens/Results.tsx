import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { generateFeedback } from "../services/aiService";
import { Trophy, RotateCcw, Loader2 } from "lucide-react";

const Results = () => {
  const { questions,calculateScore, topic, resetQuiz } = useQuiz();
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const score = calculateScore() ;
  const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/");
      return;
    }

    const loadFeedback = async () => {
      try {
        const aiFeeback = await generateFeedback(score, questions.length, topic);
        setFeedback(aiFeeback);
      } catch (error) {
        console.error("Failed to generate feedback:", error);
        setFeedback("Great job completing the quiz!");
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [questions, score, topic, navigate]);

  const handleTryAgain = () => {
    resetQuiz();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
          <p>Generating your personalized feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-8 space-y-8 animate-fade-in ">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold ">
            Quiz Complete!
          </h1>
          <div className="space-y-2">
            <p className="text-5xl font-bold ">
              {score} / {questions.length}
            </p>
            <p className="text-xl ">
              {percentage.toFixed(0)}% Correct
            </p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-lg leading-relaxed">
            {feedback}
          </p>
        </div>

        <div className="flex justify-center">
          <button onClick={handleTryAgain} className="flex text-xl justify-center items-center h-11 rounded-md px-8 border bg-blue-300 hover:bg-blue-400">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
