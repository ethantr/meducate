'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, HeartPulse } from "lucide-react"
import confetti from 'canvas-confetti'

// Mock API call - replace with actual API call
const fetchTopicData = async (id) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    title: "Understanding Balanced Diet",
    slides: [
      { content: "A balanced diet includes a variety of foods from all food groups.", image: "/placeholder.svg" },
      { content: "Aim for a colorful plate to ensure you're getting a range of nutrients.", image: "/placeholder.svg" },
      { content: "Portion control is key to maintaining a healthy diet.", image: "/placeholder.svg" },
      { content: "Stay hydrated! Water is an essential part of a balanced diet.", image: "/placeholder.svg" },
    ]
  }
}

export default function TopicPage() {
  const id = useParams()
  const [topicData, setTopicData] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchTopicData(id).then(data => {
        setTopicData(data)
        setIsLoading(false)
      })
    }
  }, [id])

  const nextSlide = () => {
    if (currentSlide < topicData.slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      // Here you would navigate to the questions page
      console.log("Navigate to questions")
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <HeartPulse className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-2xl font-bold text-green-500">Meducate</span>
        </div>
        <h1 className="text-xl font-bold">{topicData.title}</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 md:p-6 h-full flex flex-col">
          <Progress 
            value={(currentSlide + 1) / topicData.slides.length * 100} 
            className="w-full h-2 mb-4"
          />
          <div className="flex-1 relative overflow-hidden rounded-lg bg-gray-900 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <img 
                  src={topicData.slides[currentSlide].image} 
                  alt="Slide illustration" 
                  className="w-64 h-64 object-cover rounded-lg mb-6 shadow-lg"
                />
                <p className="text-2xl font-bold mb-4">{topicData.slides[currentSlide].content}</p>
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
              {currentSlide === topicData.slides.length - 1 ? "Start Quiz" : "Next"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}