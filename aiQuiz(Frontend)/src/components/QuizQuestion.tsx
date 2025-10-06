// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { useQuiz } from "../contexts/QuizContext";
import type { QuizQuestion as QuizQuestionType } from "../services/aiService";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
}

const QuizQuestion = ({ question, questionIndex }: QuizQuestionProps) => {
  const { userAnswers, setUserAnswer } = useQuiz();
  const selectedAnswer = userAnswers[questionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    setUserAnswer(questionIndex, optionIndex);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 rounded-lg border shadow-sm">
      <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={selectedAnswer === index ? "w-full text-left border bg-green-500 justify-start h-auto py-4 px-6 transition-all "
             : "border hover:bg-gray-200 w-full justify-start text-left h-auto py-4 px-6 transition-all"}
            onClick={() => handleSelectAnswer(index)}
          >
            <span className="font-semibold mr-3">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="flex-1">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
