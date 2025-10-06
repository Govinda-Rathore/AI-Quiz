import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import QuizQuestion from "../components/QuizQuestion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Quiz = () => {
  const {
    questions,currentQuestionIndex,setCurrentQuestionIndex,userAnswers,} = useQuiz();

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex ) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrent = userAnswers[currentQuestionIndex] !== null;

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6 animate-fade-in">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm ">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
            <div>
                <div style={{ width: `${(currentQuestionIndex+1 / questions.length) * 100}%` }} className="progress-fill" />
            </div>
        </div>

        <QuizQuestion
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
        />

        <div className="flex justify-between gap-4">
          <button
            className="border flex center  h-10  px-4 py-2  bg-gray-100 hover:bg-gray-200"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            className="border flex center  h-10  px-4 py-2 bg-gray-100 hover:bg-gray-200"
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
            {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
