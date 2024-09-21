"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, HeartPulse } from "lucide-react";
import confetti from "canvas-confetti";

// Mock API call - replace with actual API call
const fetchTopicData = async (id) => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    title: "Understanding Balanced Diet",
    slides: [
      {
        content:
          "A balanced diet includes a variety of foods from all food groups.",
        image: "/placeholder.svg",
      },
      {
        content:
          "Aim for a colorful plate to ensure you're getting a range of nutrients.",
        image: "/placeholder.svg",
      },
      {
        content: "Portion control is key to maintaining a healthy diet.",
        image: "/placeholder.svg",
      },
      {
        content:
          "Stay hydrated! Water is an essential part of a balanced diet.",
        image: "/placeholder.svg",
      },
    ],
  };
};

export default function TopicPage() {
  const id = useParams();
  const [topicData, setTopicData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false); // New state for toggling between slides and quiz
  const [selectedAnswer, setSelectedAnswer] = useState(null); // For quiz mode
  const [progress, setProgress] = useState(0); // For quiz mode progress

  // useEffect(() => {
  //   if (id) {
  //     fetchTopicData(id).then((data) => {
  //       setTopicData(data);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [id]);

  useEffect(() => {
    const callAPI = async () => {
      setIsLoading(true); // Start loading when API call begins
      const userCharacteristics = {
        age: 16,
        gender: "male",
        education: "high school",
        proficiency: "Basic English",
        location: "France",
      };
      const topic = "diabetes";

      try {
        const response = await fetch("/api/anthropic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
                {"text": "A", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
    {"text": "B", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
    {"text": "C", "isCorrect": boolean, "explanation": "Why correct/incorrect"},
    {"text": "D", "isCorrect": boolean, "explanation": "Why correct/incorrect"}
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

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        let json = extractJson(data.message)
        console.log("API Response:", json)
        setTopicData(json); // Store the API data
      } catch (error) {
        console.error("Error calling API:", error);
      } finally {
        setIsLoading(false); // Stop loading when the API call is finished
      }
    };

    callAPI();
  }, []); // Add dependencies here if needed

  
  const nextSlide = () => {
    if (currentSlide < topicData["slides"].length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsQuizMode(true); // Transition to quiz mode when the last slide is reached
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer) {
      // Handle quiz answer submission logic
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      setSelectedAnswer(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Conditional Rendering: if isQuizMode is true, show quiz; otherwise, show slides
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <HeartPulse className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-2xl font-bold text-green-500">
            Meducate
          </span>
        </div>
        <h1 className="text-xl font-bold">{topicData.title}</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 md:p-6 h-full flex flex-col">
          {isQuizMode ? (
            // Render Quiz Mode
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
              <Progress value={progress} className="w-full mb-8" />
              <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full">
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-100">
                  {topicData.questions[currentQuestion].question}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {topicData.questions[currentQuestion].options.map((answer) => (
                    <Button
                      key={answer.text}
                      variant={
                        selectedAnswer === answer.text ? "default" : "outline"
                      }
                      className={`h-16 text-lg ${
                        selectedAnswer === answer.text
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
                      }`}
                      onClick={() => setSelectedAnswer(answer.text)}
                    >
                      {answer.text}
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSubmitQuiz}
                  disabled={!selectedAnswer}
                >
                  Check Answer
                </Button>
              </div>
            </div>
          ) : (
            // Render Slide Mode
            <>
              <Progress
                value={((currentSlide + 1) / topicData["slides"].length) * 100}
                className="w-full h-2 mb-4 h-3 bg-green-900"
                indicatorColour="bg-green-500"
              />
              <div className="flex-1 relative overflow-hidden rounded-lg bg-gray-900 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide} // Ensure keying by slide number
                    initial={{ opacity: 0, x: 50 }} // Start animation properties
                    animate={{ opacity: 1, x: 0 }} // Animation on enter
                    exit={{ opacity: 0, x: -50 }} // Exit animation
                    transition={{ duration: 0.5 }} // Slightly slower for smooth transition
                    className="flex flex-col items-center justify-center p-6 text-center h-full"
                  >
                    <img
                      src={topicData["slides"][currentSlide].image}
                      alt="Slide illustration"
                      className="w-64 h-64 object-cover rounded-lg mb-6 shadow-lg"
                    />
                    <p className="text-2xl font-bold mb-4">
                      {topicData["slides"][currentSlide].content}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="bg-gray-800 hover:bg-gray-700"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={nextSlide}
                  className="bg-green-500 hover:bg-green-600 text-gray-950"
                >
                  {currentSlide === topicData["slides"].length - 1
                    ? "Start Quiz"
                    : "Next"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function extractJson(text) {
  // Find the first occurrence of '{' and the last occurrence of '}'
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}') + 1;

  // If valid JSON start and end found, extract the substring
  if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = text.substring(jsonStart, jsonEnd);
      
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
