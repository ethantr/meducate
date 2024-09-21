import React from 'react'
import { Heart, Award, BookOpen, Settings } from 'lucide-react'
const navbar = () => {
  return (
    <>
        <div className="w-16 bg-gray-800 shadow-md flex flex-col items-center py-4 space-y-8">
        <Heart className="text-red-400" />
        <Award className="text-yellow-400" />
        <BookOpen className="text-blue-400" />
        <Settings className="text-gray-400" />
      </div>
    </>
  )
}

export default navbar