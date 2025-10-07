import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import QuizQuestion from "../components/QuizQuestion";
import {
  Book,
  Brain,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  Laptop,
  Lightbulb,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const topicDetails = [
  { name: "Wellness", icon: Heart, color: "text-pink-500" },
  { name: "Tech Trends", icon: Laptop, color: "text-blue-500" },
  { name: "World History", icon: Globe, color: "text-green-500" },
  { name: "Science & Innovation", icon: Lightbulb, color: "text-yellow-500" },
  { name: "Literature", icon: Book, color: "text-purple-500" },
  { name: "Psychology", icon: Brain, color: "text-indigo-500" },
];

const Quiz = () => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    topic,
  } = useQuiz();

  const navigate = useNavigate();
  const errorShownRef = useRef(false);

  // 🔹 Show toast once
  useEffect(() => {
    if (questions.length === 0 && !errorShownRef.current) {
      errorShownRef.current = true;
      const toastId = toast.error("Failed to load quiz. Please try again.");
      setTimeout(()=>{toast.dismiss(toastId);},2000)
    }
  }, [questions]);

  // 🔹 Handle navigation separately (guaranteed to run after toast)
  useEffect(() => {
    if (questions.length === 0) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [questions, navigate]);

  // ✅ UI when no quiz data found
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-plum-gradient text-white">
        <Toaster position="top-center" />

      </div>
    );
  }

  // ✅ Normal quiz rendering
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrent = userAnswers[currentQuestionIndex] !== null;
  const currentTopicDetails = topicDetails.find((item) => item.name === topic);
  const IconComponent = currentTopicDetails?.icon || Brain;
  const iconColor = currentTopicDetails?.color || "text-indigo-500";

  const handleNext = () => {
    if (isLastQuestion) {
      navigate("/results");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br bg-plum-gradient text-white p-8">
      <div className="flex flex-col items-center justify-center mb-10 md:mb-0 md:mr-12">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-plum-gradien rounded-full blur-2xl opacity-70 animate-pulse"></div>
          <IconComponent
            className={`w-32 h-32 ${iconColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]`}
          />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 w-full max-w-2xl flex flex-col h-[90vh] md:h-auto">
        <div className="flex justify-between max-h-fit text-sm md:text-base text-gray-200">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>

        {/* ✅ Visible white progress bar */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2 shadow-inner">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-white/90 transition-all duration-500 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          />
        </div>

        <div className="mt-4">
          <QuizQuestion
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-300
              ${currentQuestionIndex === 0 ? "" : "bg-plum-gradient"}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-300
              ${!hasAnsweredCurrent ? "" : "bg-plum-gradient"}`}
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
