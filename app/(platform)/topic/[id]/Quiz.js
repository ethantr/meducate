"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Award, BookOpen, Settings } from "lucide-react";
import data from "../../../dummy_data/dummyData";
export default function Page() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const callAPI = async () => {
      const anthropic = new Anthropic({
        apiKey: process.env["ANTHROPIC_API_KEY"]
      });
      const msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 2000,
        temperature: 1,
        system:
          `Generate a health literacy question based on the following user characteristics and chosen topic:
Age: [Between 50 and above]
Gender: [Male]
Education Level: [High School]
Ethnic Background: [Latino]
Language Proficiency: [Basic English]
Location: [urban area Canberra, Australia]
Chosen Topic: [hypertension]
Please create a question that is:
1. Relevant to the chosen topic
2. Appropriate for the user's age, gender, and education level
3. Culturally sensitive and considerate of the user's ethnic background
4. Matched to the user's language proficiency
5. Contextualized for the user's location if relevant
Provide the question in the JSON format as specified in the system prompt, including:
- A title on the top of the quiz
- A clear and concise question
- A brief context to educate me before I take the topic
- Four answer options (one correct, three incorrect)
- Explanations for why each option is correct or incorrect
- In a seaparate response, a content to educate me so that I have enough knowledge to take quiz
- content must be in 5 separate slides
- Generate 5 questions in every response
- Even if the same topic, provide different content relate to topic and different questions everytime
Ensure that the content is accurate, up-to-date with current health guidelines, and informative for the user's health literacy needs.`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Hello",
              },
            ],
          },
        ],
      });
      console.log(msg.contents[0].text);
    };
    callAPI();
  });

  const handleSubmit = () => {
    if (selectedAnswer) {
      // Here you would typically check if the answer is correct
      // and update the progress accordingly
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">Meducate</h1>
          <div className="flex items-center space-x-4">
            <Heart className="tex   t-red-400" />
            <span className="font-semibold">5</span>
          </div>
        </header>

        {/* Quiz content */}
        <main className="flex-1 p-8 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <Progress value={progress} className="w-full mb-8" />
          <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-100">
              {data["question"]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {data.options.map((answer) => (
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
                  onClick={() => setSelectedAnswer(answer)}
                >
                  {answer.text}
                </Button>
              ))}
            </div>
            <Button
              className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
