'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartPulse, Brain, Apple, Dna, Award, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <HeartPulse className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-2xl font-bold text-green-500">Meducate</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
      <section className="w-full py-8 md:py-12 lg:py-14 xl:py-16">
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-1/2 space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Learn Health Care, One Game at a Time
        </h1>
        <p className="text-gray-400 md:text-xl">
          Meducate makes understanding health care fun and easy. Join millions learning to take control of their health journey.
        </p>
      </div>
      <Image
        width={400}
        height={400}
        src={"https://imagedelivery.net/0LwqpAMWL2C8o12h9UoZew/64500cc6-a6e7-4494-ba24-d25b6b5a8700/public"}
        alt=""
        className="md:w-1/2"
      />
    </div>
    <div className="space-x-4 mt-4">
      <Button className="bg-green-500 text-gray-950 hover:bg-green-600 text-lg">Get Started for Free</Button>
      <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-950 text-lg">
        Learn More
      </Button>
    </div>
  </div>
</section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6"> {/* Added mx-auto */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose Meducate?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Brain className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">Learn at Your Pace</h3>
                <p className="text-gray-400 text-center">Bite-sized lessons that fit into your busy schedule</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Apple className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">Health Made Simple</h3>
                <p className="text-gray-400 text-center">Complex topics broken down into easy-to-understand concepts</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Dna className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">Personalized Learning</h3>
                <p className="text-gray-400 text-center">Adaptive lessons tailored to your learning style and progress</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Award className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">Gamified Experience</h3>
                <p className="text-gray-400 text-center">Earn points, unlock achievements, and compete with friends</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6"> {/* Added mx-auto */}
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Health-Savvy Community
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  Over 1 million users are already improving their health literacy with Meducate. Start your journey today and take control of your wellbeing.
                </p>
                <Button className="bg-green-500 text-gray-950 hover:bg-green-600">
                  Sign Up Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-green-500">
                  Testimonial
                </div>
                <blockquote className="text-lg font-semibold">
                  "Meducate has transformed the way I understand my health. It's like having a friendly doctor in my pocket!"
                </blockquote>
                <p className="text-gray-400">- Sarah J., Meducate User</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6"> {/* Added mx-auto */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Health Journey?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join Meducate today and start learning about health care in a fun, engaging way.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 text-gray-100 border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-green-500 text-gray-950 hover:bg-green-600" type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-green-500" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2023 Meducate. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
