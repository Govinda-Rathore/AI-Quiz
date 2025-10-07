import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { Brain, Heart, Laptop, Globe, Lightbulb, Book } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const topics = [
  { name: "Wellness", icon: Heart, color: "text-pink-500" },
  { name: "Tech Trends", icon: Laptop, color: "text-blue-500" },
  { name: "World History", icon: Globe, color: "text-green-500" },
  { name: "Science & Innovation", icon: Lightbulb, color: "text-yellow-500" },
  { name: "Literature", icon: Book, color: "text-purple-500" },
  { name: "Psychology", icon: Brain, color: "text-indigo-500" },
];

const TopicSelection = () => {
const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
const activeToastId = useRef<string | null>(null);  
const { setTopic } = useQuiz();
const navigate = useNavigate();

const handleSelectTopic = (topicName: string) => {
    setSelectedTopic(topicName);
    if (activeToastId.current) {
      toast.dismiss(activeToastId.current);
    }
    activeToastId.current = toast.success(`Selected: ${topicName}`);
  };

  const handleStartQuiz = () => {
    if (selectedTopic) {
      setTopic(selectedTopic);
      navigate("/loading");
    } else {
      toast.error("Please select a topic first!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-plum-gradient text-white">
      <div className="max-w-3xl w-full space-y-12 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">AI Knowledge Quiz</h1>
          <p className="text-lg text-gray-300 mt-2">
            Choose a topic to test your knowledge
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.name}
                className={`bg-white p-6 rounded-2xl border border-gray-600 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-gray-400  text-black ${
                  selectedTopic === topic.name ? "selected-card" : ""
                }`}
                onClick={() => handleSelectTopic(topic.name)}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Icon className={`w-12 h-12 ${topic.color}`} />
                  <h3 className="text-lg font-medium text-center">{topic.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            disabled={!selectedTopic}
            className="font-bold py-3 px-12 rounded-lg text-xl transition-all duration-300 disabled:bg-white disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelection;