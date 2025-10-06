import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { QuizQuestion } from "../services/aiService";

interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;

  questions: QuizQuestion[];
  setQuestions: (questions: QuizQuestion[]) => void;

  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;

  userAnswers: (number | null)[];
  setUserAnswer: (index: number, answer: number) => void;
  setUserAnswers: (answers: (number | null)[]) => void;

  score: number;
  calculateScore: () => number;

  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const setUserAnswer = (index: number, answer: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  
  const calculateScore = () => {

    // console.log(userAnswers)
    // console.log(userAnswers[0])
    // if(questions[0]){
    // console.log(questions[0].options[userAnswers[0] as number])
    // console.log(questions[0].answer);}
    // console.log(questions)
    return questions.reduce((acc, question, index) => {
      return acc + (question.options[userAnswers[index] as number] === question.answer ? 1 :0);
    }, 0);
  };

  const resetQuiz = () => {
    setTopic("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const value = {
    topic,
    setTopic,
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswer,
    setUserAnswers,
    score: calculateScore(),
    calculateScore,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
