"use client";

import { useState, useEffect } from "react";
import { useParams,useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, HeartPulse } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function TopicPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  console.log(topic)
  const [topicData, setTopicData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionExplanation, setQuestionExplanation] = useState("");
  const [progress, setProgress] = useState(0);

  const dummy_data = {
    // title: "Understanding Balanced Diet",
    slides: [
      {
        content:
          "A balanced diet includes a variety of foods from all food groups.",
      },
      {
        content:
          "Aim for a colorful plate to ensure you're getting a range of nutrients.",
      },
      {
        content: "Portion control is key to maintaining a healthy diet.",
      },
      {
        content:
          "Stay hydrated! Water is an essential part of a balanced diet.",
      },
    ],
    questions: [
      {
        question: "What is the main cause of type 2 diabetes?",
        scenario:
          "Jean learns his older cousin was diagnosed with type 2 diabetes.",
        options: [
          {
            text: "Eating too much sugar",
            isCorrect: false,
            explanation:
              "While sugar can impact blood glucose, it is not the main cause of type 2 diabetes.",
          },
          {
            text: "Not exercising enough",
            isCorrect: false,
            explanation:
              "Lack of exercise is a risk factor but not the main cause of type 2 diabetes.",
          },
          {
            text: "The body not using insulin well",
            isCorrect: true,
            explanation:
              "Type 2 diabetes occurs when the body becomes resistant to insulin or doesn't make enough insulin.",
          },
          {
            text: "Drinking too much coffee",
            isCorrect: false,
            explanation:
              "Coffee consumption is not related to causing type 2 diabetes.",
          },
        ],
      },
      {
        question: "Which is NOT a common symptom of diabetes?",
        scenario: "Jean wants to know how to recognize signs of diabetes.",
        options: [
          {
            text: "Frequent urination",
            isCorrect: false,
            explanation:
              "Frequent urination, especially at night, is a common diabetes symptom.",
          },
          {
            text: "Increased thirst",
            isCorrect: false,
            explanation:
              "Excessive thirst is a typical symptom of high blood sugar and diabetes.",
          },
          {
            text: "Weight loss without trying",
            isCorrect: false,
            explanation: "Unexplained weight loss can be a sign of diabetes.",
          },
          {
            text: "Improved vision",
            isCorrect: true,
            explanation:
              "Blurred vision is common with diabetes, but vision does not typically improve.",
          },
        ],
      },
      {
        question: "How often should people with diabetes check their feet?",
        scenario:
          "Jean learned diabetes can cause foot problems and wants to give his cousin advice.",
        options: [
          {
            text: "Once a week",
            isCorrect: false,
            explanation:
              "Checking feet daily is recommended to catch any problems early.",
          },
          {
            text: "Every day",
            isCorrect: true,
            explanation:
              "Daily foot checks help spot cuts, sores, blisters or other issues before they become serious.",
          },
          {
            text: "Twice a month",
            isCorrect: false,
            explanation:
              "Foot checks should be done more often than twice monthly to prevent complications.",
          },
          {
            text: "Only before exercising",
            isCorrect: false,
            explanation:
              "Feet should be examined daily, not just prior to exercise.",
          },
        ],
      },
      {
        question: "Which is most important for managing diabetes?",
        scenario:
          "Jean's cousin asks what lifestyle changes can help control his diabetes.",
        options: [
          {
            text: "Regular exercise",
            isCorrect: false,
            explanation:
              "While exercise is very beneficial, monitoring blood sugar is most critical.",
          },
          {
            text: "Checking blood sugar levels",
            isCorrect: true,
            explanation:
              "Monitoring glucose levels regularly is essential for adjusting medications, diet and activity.",
          },
          {
            text: "Eating a low carb diet",
            isCorrect: false,
            explanation:
              "A balanced diet is important, but carb counting is not the most crucial management tool.",
          },
          {
            text: "Taking a multivitamin",
            isCorrect: false,
            explanation:
              "Multivitamins do not play a significant role in day-to-day diabetes control.",
          },
        ],
      },
      {
        question: "When should a person with diabetes see a doctor?",
        scenario:
          "Jean is unsure when his cousin needs medical attention for his diabetes.",
        options: [
          {
            text: "Blood sugar stays high",
            isCorrect: true,
            explanation:
              "Consistently elevated glucose can be dangerous and requires medical guidance.",
          },
          {
            text: "Feeling tired sometimes",
            isCorrect: false,
            explanation:
              "Occasional fatigue is common; severe tiredness should be discussed with a doctor.",
          },
          {
            text: "Getting a minor scrape",
            isCorrect: false,
            explanation:
              "Small cuts are not usually emergencies; large or slow-healing wounds need care.",
          },
          {
            text: "Having an upset stomach",
            isCorrect: false,
            explanation:
              "Stomach issues happen sometimes but aren't urgent unless blood sugars are impacted.",
          },
        ],
      },
    ],
  };

  const onAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Fetch and handle API data
  useEffect(() => {
    const fetchQuizData = async () => {
      setIsLoading(true);
      try {
        // const data = await callAnthropicAPI(topic);
        // const jsonData = extractJson(data.message);
        // setTopicData(jsonData);
        setTopicData(dummy_data);
        console.log("Done");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  // Simulate call to the external API
  const callAnthropicAPI = async (topic) => {
    const userCharacteristics = {
      age: 16,
      gender: "male",
      education: "high school",
      proficiency: "Basic English",
      location: "France",
    };

    const response = await fetch("/api/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage:
          "Generate 5 health literacy questions on" +
          topic +
          "for a " +
          userCharacteristics.age +
          "year old " +
          userCharacteristics.gender +
          "with " +
          userCharacteristics.education +
          "education ," +
          userCharacteristics.proficiency +
          " " +
          "living in " +
          userCharacteristics.location +
          `. 
          Questions should be appropriate, culturally sensitive, and match language level. 
          Use this JSON format for each question:
          {
          questions:[{
            "question": "Question text",
            "scenario": "Brief context",
            "options": [
              {"text": "", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
  {"text": "..", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
  {"text": "..", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
  {"text": "..", "isCorrect": boolean, "explanation": "Why correct/incorrect"}
]
        },
        ....
        ],
slides:[
     {
      content:
        "some content on topic",
    },
     ...etc
}`,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);

    return response.json();
  };

  function extractJson(text) {
    // Find the first occurrence of '{' and the last occurrence of '}'
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;

    // If valid JSON start and end found, extract the substring
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = text.substring(jsonStart, jsonEnd);
      console.log(jsonString);

      // Try parsing the JSON string
      try {
        const jsonData = JSON.parse(jsonString);
        return jsonData;
      } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
      }
    } else {
      console.error("No JSON found in the text");
      return null;
    }
  }

  // Handle slide transitions
  const handleNextSlide = () => {
    if (currentSlide < topicData.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setIsQuizMode(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Submit the quiz answer
  const handleSubmitQuiz = () => {
    if (selectedAnswer) {
      const currentQuestionData = topicData.questions[currentQuestion];
      const correctAnswer = currentQuestionData.options.find(
        (option) => option.isCorrect
      );
      const answerExplanation = currentQuestionData.options.find(
        (option) => selectedAnswer === option.text
      ).explanation;

      if (selectedAnswer === correctAnswer.text) {
        setProgress((prev) => Math.min(prev + 50, 100)); // Increment progress
        setQuestionExplanation(answerExplanation)
        setTimeout(() => {

          if (currentQuestion < topicData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          }else {
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
          }
          setSelectedAnswer(null);
          setQuestionExplanation("")
          
        }, 2500);
        

      } else{
        setQuestionExplanation(answerExplanation)
        console.log(answerExplanation)
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Header title={topicData.title || topic} />
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 md:p-6 h-full flex flex-col">
          {isQuizMode ? (
            <QuizMode
              progress={progress}
              question={topicData.questions[currentQuestion]}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={onAnswerSelect}
              onSubmitQuiz={handleSubmitQuiz}
              explanation={questionExplanation}
            />
          ) : (
            <SlideMode
              currentSlide={currentSlide}
              slides={topicData.slides}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// Reusable components
const Header = ({ title }) => (
  <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
    <Link href = "/home" className="flex items-center">
      <HeartPulse className="h-6 w-6 text-green-500" />
      <span className="ml-2 text-2xl font-bold text-green-500">Meducate</span>
    </Link>
    <h1 className="text-xl font-bold">{title}</h1>
  </header>
);

const QuizMode = ({
  progress,
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmitQuiz,
  explanation
}) => (
  <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
    <Progress value={progress} className="w-full mb-8" />
    <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full">
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-100">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((answer) => (
          <Button
            key={answer.text}
            variant={selectedAnswer === answer.text ? "default" : "outline"}
            className={`h-16 text-lg ${
              selectedAnswer === answer.text
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
            }`}
            onClick={() => onAnswerSelect(answer.text)}
          >
            {answer.text}
          </Button>
        ))}
      </div>
      <Button
        className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
        onClick={onSubmitQuiz}
        disabled={!selectedAnswer}
      >
        Check Answer
      </Button>
    </div>
    <div>
      {explanation}
    </div>
  </div>
);

const SlideMode = ({ currentSlide, slides, onNextSlide, onPrevSlide }) => (
  <>
    <Progress
      value={((currentSlide + 1) / slides.length) * 100}
      className="w-full h-2 mb-4 h-3 bg-green-900"
    />
    <div className="flex-1 relative overflow-hidden rounded-lg bg-gray-900 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center p-6 text-center h-full"
        >
          <img
            src={slides[currentSlide].image}
            alt="Slide illustration"
            className="w-64 h-64 object-cover rounded-lg mb-6 shadow-lg"
          />
          <p className="text-2xl font-bold mb-4">
            {slides[currentSlide].content}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevSlide}
        disabled={currentSlide === 0}
        className="bg-gray-800 hover:bg-gray-700"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <Button
        onClick={onNextSlide}
        className="bg-green-500 hover:bg-green-600 text-gray-950"
      >
        {currentSlide === slides.length - 1 ? "Start Quiz" : "Next"}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </>
);
