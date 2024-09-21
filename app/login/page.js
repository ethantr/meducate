"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, Brain, Apple, Dna, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Ensure correct import

export default function LoginPage() {
  const router = useRouter();
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [HeartPulse, Brain, Apple, Dna];
  const IconComponent = icons[currentIcon];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here (add your authentication logic)
    console.log("Login attempted with:", username, password);
    const isSuccess = true; // Replace this with actual authentication logic

    if (isSuccess) {
      // router.push(`/home?username=${encodeURIComponent(username)}`);
      router.push(`/question?username=${encodeURIComponent(username)}`);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  const cycleIcon = () => {
    setCurrentIcon((prev) => (prev + 1) % icons.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <HeartPulse className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-2xl font-bold text-green-500">
            Meducate
          </span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center" onClick={cycleIcon}>
              <IconComponent className="h-16 w-16 text-green-500 cursor-pointer transition-all duration-300 hover:scale-110" />
            </div>
            <h2 className="mt-6 text-3xl font-bold">
              Welcome back, health explorer!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Ready for your daily dose of health wisdom?
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500 focus:border-green-500"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500 focus:border-green-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-green-500 hover:text-green-400"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-green-500 text-gray-950 hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in and start learning!
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              New to Meducate?{" "}
              <Link
                href="/signup"
                className="font-medium text-green-500 hover:text-green-400"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2023 Meducate. All rights reserved.
      </footer>
    </div>
  );
}
