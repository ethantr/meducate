"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trophy, Zap, Brain } from "lucide-react";

// Mock data for demonstration
const mockUsers = [
  { id: 1, username: "HealthGuru", score: 1500, streak: 30, knowledgeScore: 85, profileColor: "bg-red-500" },
  { id: 2, username: "WellnessWarrior", score: 1450, streak: 25, knowledgeScore: 80, profileColor: "bg-blue-500" },
  { id: 3, username: "MindfulMedic", score: 1400, streak: 20, knowledgeScore: 75, profileColor: "bg-green-500" },
  { id: 4, username: "NutritionNinja", score: 1350, streak: 15, knowledgeScore: 70, profileColor: "bg-yellow-500" },
  { id: 5, username: "FitnessFanatic", score: 1300, streak: 10, knowledgeScore: 65, profileColor: "bg-purple-500" },
];

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState(mockUsers);
  const [currentFilter, setCurrentFilter] = useState("world");

  useEffect(() => {
    // In a real app, you would fetch the leaderboard data here
    // For now, we'll just use the mock data
    setLeaderboardData(mockUsers);
  }, [currentFilter]);

  const filteredUsers = leaderboardData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center">
            <h1 className="text-3xl font-bold mb-2">Meducate Leaderboard</h1>
            <p className="text-gray-400">See how you stack up against other health enthusiasts!</p>
          </section>

          <Tabs defaultValue="world" className="w-full "value={currentFilter} onValueChange={setCurrentFilter} >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="world" onClick={() => setCurrentFilter("world")}>World</TabsTrigger>
              <TabsTrigger value="country" onClick={() => setCurrentFilter("country")}>Country</TabsTrigger>
              <TabsTrigger value="friends" onClick={() => setCurrentFilter("friends")}>Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="world">
              <LeaderboardContent users={filteredUsers} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </TabsContent>
            <TabsContent value="country">
              <LeaderboardContent users={filteredUsers} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </TabsContent>
            <TabsContent value="friends">
              <LeaderboardContent users={filteredUsers} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function LeaderboardContent({ users, searchQuery, setSearchQuery }) {
  return (
    <>
      <div className="relative my-4">
        <Input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500 focus:border-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={user.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold">{index + 1}</span>
              <Avatar className={`h-10 w-10 ${user.profileColor}`} />
              <div>
                <h3 className="font-semibold">{user.username}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Trophy className="h-4 w-4" />
                  <span>{user.score} pts</span>
                  <Zap className="h-4 w-4 ml-2" />
                  <span>{user.streak} day streak</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-green-500" />
              <span className="font-semibold">{user.knowledgeScore}% Knowledge</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
