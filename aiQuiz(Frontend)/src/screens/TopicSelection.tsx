import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { Brain, Heart, Laptop, Globe, Lightbulb, Book } from "lucide-react";

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
  const { setTopic } = useQuiz();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (selectedTopic) {
      
      setTopic(selectedTopic);
      console.log("topicselection")
      navigate("/loading");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold ">
            AI Knowledge Quiz
          </h1>
          <p className="text-lg ">
            Choose a topic to test your knowledge
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.name}
                className={` p-6 cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg border bg-white text-black shadow-sm${
                  selectedTopic === topic.name
                    ? "bg-black ring-2 ring-black shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedTopic(topic.name)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon className={`w-12 h-12 ${topic.color}`} />
                  <h3 className="text-lg font-semibold text-center">
                    {topic.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            disabled={!selectedTopic}
            className="px-8 h-11 rounded-md bg-black text-white hover:bg-black/90"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelection;
