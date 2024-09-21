"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  HeartPulse,
  Brain,
  Apple,
  Dna,
  Pill,
  Stethoscope,
  Syringe,
  Activity,
  Search,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const categories = [
  {
    name: "Basics",
    icon: HeartPulse,
    color: "text-red-500",
    topics: ["Health 101", "Body Systems", "Medical Terms"],
  },
  {
    name: "Nutrition",
    icon: Apple,
    color: "text-green-500",
    topics: ["Balanced Diet", "Vitamins & Minerals", "Food Labels"],
  },
  {
    name: "Mental Health",
    icon: Brain,
    color: "text-purple-500",
    topics: ["Stress Management", "Emotional Wellness", "Sleep Hygiene"],
  },
  {
    name: "Fitness",
    icon: Activity,
    color: "text-blue-500",
    topics: ["Exercise Basics", "Cardio vs. Strength", "Injury Prevention"],
  },
  {
    name: "Medications",
    icon: Pill,
    color: "text-yellow-500",
    topics: ["Common Medications", "Side Effects", "Proper Usage"],
  },
  {
    name: "Preventive Care",
    icon: Stethoscope,
    color: "text-indigo-500",
    topics: ["Screenings", "Vaccinations", "Health Checks"],
  },
  {
    name: "First Aid",
    icon: Syringe,
    color: "text-orange-500",
    topics: ["Emergency Response", "Wound Care", "CPR Basics"],
  },
  {
    name: "Genetics",
    icon: Dna,
    color: "text-pink-500",
    topics: ["Hereditary Conditions", "Genetic Testing", "Family History"],
  },
];

export default function HomePage() {

    const router = useRouter()

    const [username, setUsername] = useState("");

    const searchParams = useSearchParams();
    
    useEffect(() => {
        // Check if the username is in the search parameters
        const paramUsername = searchParams.get("username");
    
        if (paramUsername) {
          setUsername(paramUsername);
          localStorage.setItem("username", paramUsername); // Store it in local storage
        } else {
          const storedUsername = localStorage.getItem("username");
          
          if (!storedUsername) {
            // If no username is found, navigate to the login page
            router.push("/login");
          } else {
            setUsername(storedUsername);
          }
        }
      }, [router, searchParams]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {username}!
            </h1>
            <p className="text-gray-400">
              Your journey to health literacy continues. What will you learn
              today?
            </p>
          </section>
          <section className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Your Progress</h2>
              <p className="text-gray-400">Keep going! You're doing great!</p>
            </div>
            <div className="w-1/3">
              <Progress
                value={33}
                className="h-3 bg-green-700"
                indicatorClassName="bg-green-500"
              />
            </div>
          </section>
          <section className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search health topics..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold">Health Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto flex flex-col items-center justify-center p-4 border-gray-700 hover:bg-gray-300 ${
                    selectedCategory === index ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setSelectedCategory(index)}
                >
                  <category.icon className={`h-8 w-8 mb-2 ${category.color}`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Health Literacy Roadmap</h2>
            <div className="relative">
              {categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`flex items-center mb-8 ${
                    categoryIndex % 2 === 0 ? "" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      categoryIndex % 2 === 0 ? "pr-8" : "pl-8"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-2 ${category.color}`}
                    >
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <Button
                          key={topicIndex}
                          variant="secondary"
                          className="w-full text-left justify-start py-2 px-3 bg-gray-800 hover:bg-gray-300"
                        >
                          <category.icon
                            className={`h-4 w-4 mr-2 ${category.color}`}
                          />
                          {topic}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-700 transform -translate-x-1/2" />
            </div>
          </section>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-400 border-t border-gray-800">
        © 2023 Meducate. Keep learning, stay healthy!
      </footer>
    </div>
  );
}
