"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Award, BookOpen, Settings } from 'lucide-react'
import data from '../dummy_data/dummyData'
export default function Page() {

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleSubmit = () => {
    if (selectedAnswer) {
      // Here you would typically check if the answer is correct
      // and update the progress accordingly
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100))
      setSelectedAnswer(null)
    }
  }

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
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-100">{data["question"]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {data.options.map((answer) => (
                <Button
                  key={answer.text}
                  variant={selectedAnswer === answer.text ? "default" : "outline"}
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
  )
}