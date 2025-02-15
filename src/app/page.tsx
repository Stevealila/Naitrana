"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center animate-fade-in leading-tight">
        Work Smarter, Not Harder
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 text-center max-w-xl mb-6 animate-slide-up">
        Use tools that simplify, optimize,
        and scale your workflow—effortlessly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/api/auth/signin?callbackUrl=/tools")}
          className="px-6 py-3 w-full sm:w-auto bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          🚀 Get Started
        </button>
        <button
          onClick={() => router.push("/tools")}
          className="px-6 py-3 w-full sm:w-auto bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
        >
          🔧 Explore Tools
        </button>
      </div>
    </div>
  );
};

export default Home;
