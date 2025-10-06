// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./contexts/QuizContext";
import TopicSelection from "./screens/TopicSelection";
import Loading from "./screens/Loading";
import Quiz from "./screens/Quiz";
import Results from "./screens/Results";
import NotFound from "./screens/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
      <QuizProvider>
        {/* <Toaster /> */}
        {/* <Sonner /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopicSelection />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default App;
