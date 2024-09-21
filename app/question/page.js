"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    question: "What is your age range?",
    options: ["Under 18", "18-24", "25-34", "35-44", "45+"],
  },
  {
    id: 2,
    question: "What is your gender?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    id: 3,
    question: "What is your highest education level?",
    options: [
      "High School",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
    ],
  },
  {
    id: 4,
    question: "What is your ethnic background?",
    options: ["White", "Black or African American", "Asian", "Hispanic", "Other"],
  },
  {
    id: 5,
    question: "What is your native language?",
    options: ["English", "Spanish", "French", "Mandarin", "Other"],
  },
];

export default function MultipleChoiceCard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);

    // Move to the next question after a delay
    setTimeout(() => {
      setAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length); // Loop back after the last question
    }, 1500); // 1.5 second delay to simulate flipping effect
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-100">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {!answered ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-2 w-full">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  className="w-full bg-gray-700 hover:bg-gray-600"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold">You answered:</h2>
            <p className="text-xl">{selectedAnswer}</p>
            <p className="text-sm text-gray-400">Flipping to the next question...</p>
          </div>
        )}
      </div>
    </div>
  );
}
