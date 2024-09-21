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
    "questions": [
      {
        "question": "You're at a friend's house and he offers you a cigarette. What should you do?",
        "scenario": "You're hanging out with friends and one of them offers you a cigarette.",
        "options": [
          {
            "text": "Take it and try it, it's just one cigarette.",
            "isCorrect": false,
            "explanation": "Starting to smoke, even once, can lead to addiction and health problems in the future."
          },
          {
            "text": "Politely refuse and say you don't smoke.",
            "isCorrect": true,
            "explanation": "It's important to stand up for your health choices and say no to things that could harm you."
          },
          {
            "text": "Tell him you don't like smoking but you'll try it this time.",
            "isCorrect": false,
            "explanation": "It's important to be consistent in your decisions about your health."
          },
          {
            "text": "Tell him you're not allowed to smoke by your parents.",
            "isCorrect": false,
            "explanation": "While your parents' rules are important, it's also good to understand the reasons behind healthy choices."
          }
        ]
      },
      {
        "question": "You're feeling stressed about exams. What is a healthy way to manage your stress?",
        "scenario": "You're feeling really stressed about upcoming exams.",
        "options": [
          {
            "text": "Stay up late studying, you need to get good grades.",
            "isCorrect": false,
            "explanation": "Lack of sleep can worsen stress and make it harder to concentrate."
          },
          {
            "text": "Eat junk food for energy, it's faster than cooking.",
            "isCorrect": false,
            "explanation": "Unhealthy food choices can make you feel worse and contribute to stress."
          },
          {
            "text": "Talk to a friend or family member about how you feel.",
            "isCorrect": true,
            "explanation": "Sharing your feelings can help reduce stress and you might get helpful advice."
          },
          {
            "text": "Ignore the stress and focus on other things.",
            "isCorrect": false,
            "explanation": "Ignoring stress can make it worse in the long run. It's important to address it in a healthy way."
          }
        ]
      },
      {
        "question": "You're at a party and someone offers you alcohol. What should you do?",
        "scenario": "You're at a party with friends and someone offers you a drink.",
        "options": [
          {
            "text": "Take a small sip to be polite, it's just one drink.",
            "isCorrect": false,
            "explanation": "Drinking alcohol under the legal age is illegal and can be dangerous for your health."
          },
          {
            "text": "Say you're not feeling well and you can't drink.",
            "isCorrect": true,
            "explanation": "It's okay to say no to things you don't want to do, even if it means politely declining."
          },
          {
            "text": "Take a drink to fit in with your friends.",
            "isCorrect": false,
            "explanation": "You should make choices based on what's right for you, not to please others."
          },
          {
            "text": "Ask someone else to take the drink for you.",
            "isCorrect": false,
            "explanation": "It's not okay to give alcohol to someone who is not legally allowed to drink."
          }
        ]
      },
      {
        "question": "Your friend is trying to convince you to skip school. What should you do?",
        "scenario": "Your friend asks you to skip school with them.",
        "options": [
          {
            "text": "Skip school, it's just one day.",
            "isCorrect": false,
            "explanation": "Skipping school can lead to falling behind in your studies and missing important lessons."
          },
          {
            "text": "Tell your friend you can't skip school and explain why.",
            "isCorrect": true,
            "explanation": "It's important to stand up for your own choices and prioritize your education."
          },
          {
            "text": "Tell your friend you'll skip school but only if they promise not to tell anyone.",
            "isCorrect": false,
            "explanation": "Skipping school is not a good decision and it's important to be honest with yourself and others."
          },
          {
            "text": "Go to school but tell your friend you're going to be absent.",
            "isCorrect": false,
            "explanation": "This can lead to confusion and unnecessary worries for your friends and family."
          }
        ]
      },
      {
        "question": "You're feeling down and sad. What can you do to feel better?",
        "scenario": "You're feeling sad and you don't know what to do about it.",
        "options": [
          {
            "text": "Keep your feelings to yourself, it will pass eventually.",
            "isCorrect": false,
            "explanation": "It's important to talk to someone you trust when you're feeling down."
          },
          {
            "text": "Spend time doing activities you enjoy, like playing sports or hanging out with friends.",
            "isCorrect": true,
            "explanation": "Engaging in positive activities can help improve your mood and make you feel better."
          },
          {
            "text": "Use social media to vent your feelings, everyone else is doing it.",
            "isCorrect": false,
            "explanation": "Venting on social media might not be the best way to cope with sad feelings. It's better to talk to someone you trust."
          },
          {
            "text": "Stay inside and avoid social contact, you don't want to burden anyone with your problems.",
            "isCorrect": false,
            "explanation": "It's important to connect with others and seek support when you're struggling."
          }
        ]
      }
    ],
    "slides": [
      {
        "content": "Taking care of your health is important at every age! It means making choices that keep your body and mind strong. Let's explore some important health tips."
      },
      {
        "content": "**Eating Healthy:**  Choose fruits, vegetables, and whole grains most of the time.  Don't forget to drink plenty of water!  It's good for your energy and keeps you feeling your best."
      },
      {
        "content": "**Getting Active:**  Try to get at least 60 minutes of physical activity each day.  It could be playing sports, dancing, or even taking a walk with friends.  Staying active helps your body and your mind feel good."
      },
      {
        "content": "**Sleeping Well:**  Getting enough sleep is really important.  Aim for 8-10 hours of sleep each night.  A good night's sleep helps you concentrate and focus better during the day."
      },
      {
        "content": "**Managing Stress:**  Life can be stressful, but there are healthy ways to cope. Talk to someone you trust, try relaxing activities, or listen to music.  Taking care of yourself helps you manage stress better."
      },
      {
        "content": "**Making Healthy Choices:** It's important to make good choices for your health.  Say no to things that could harm you, like smoking, drinking alcohol, or using drugs.  Choose healthy activities and stay safe."
      },
      {
        "content": "Remember, taking care of your health is your responsibility!  Make smart choices and stay healthy!"
      }
    ]
  };

  const onAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Fetch and handle API data
  useEffect(() => {
    const fetchQuizData = async () => {
      setIsLoading(true);
      try {
        const data = await callAnthropicAPI(topic);
        console.log(data);
        // const jsonData = extractJson(data.message);
        setTopicData(data.response);
        console.log(data.response)
        // setTopicData(dummy_data);
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

    const response = await fetch("/api/gemini", {
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
      <Header title={topic} />
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
