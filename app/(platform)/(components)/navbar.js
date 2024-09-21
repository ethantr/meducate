"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  HeartPulse,
  Brain,
  Apple,
  Dna,
  Pill,
  Syringe,
  Activity,
  User,
  Search,
  Trophy,
  RefreshCw,
  Flame,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleAvatarClick = () => {
    localStorage.setItem("username", "");
    router.push("/");
  }

  useEffect(() => {
    // Simulating initial data fetch
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    // Simulating API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.floor(Math.random() * 1000),
          streak: Math.floor(Math.random() * 30),
        })
      }, 1000)
    })

    setScore(response.score)
    setStreak(response.streak)
  }

  const syncData = async () => {
    setIsSyncing(true)
    await fetchUserData()
    setIsSyncing(false)
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
      <Link className="flex items-center justify-center" href="/home">
        <HeartPulse className="h-6 w-6 text-green-500" />
        <span className="ml-2 text-2xl font-bold text-green-500">
          Meducate
        </span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 text-amber-300">
          <Brain className="h-5 w-5" />
          <span>{score}</span>
        </div>
        <div className="flex items-center gap-2 text-orange-300">
          <Flame className="h-5 w-5" />
          <span>{streak} day streak</span>
        </div>
        <Link href="/leaderboard">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-gray-100"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Leaderboard
          </Button>
        </Link>
        <Button variant="ghost" className="text-gray-300 hover:text-gray-100">
          <Rocket className="h-5 w-5 mr-2" />
          Daily Quest
        </Button>
        <Button variant="ghost" className="text-gray-300 hover:text-gray-100" onClick={handleAvatarClick}>
          <User className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  )
}

export default Navbar