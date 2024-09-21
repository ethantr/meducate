import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { HeartPulse, Brain, Apple, Dna, Pill, Stethoscope, Syringe, Activity, User, Search } from "lucide-react"
import Link from "next/link"
const Navbar = () => {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/home">
          <HeartPulse className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-2xl font-bold text-green-500">
            Meducate
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Button variant="ghost" className="text-gray-300 hover:text-gray-100">
            <Activity className="h-5 w-5 mr-2" />
            Daily Quest
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-gray-100">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Navbar