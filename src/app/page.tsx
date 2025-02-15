"use client";

import React from "react";
import { loginWithGoogle } from "@/actions";
import { signIn } from "next-auth/react";

const Home = () => {
  const handleLogin = async (formData: FormData) => {
    const result = await loginWithGoogle(formData);
    if (result.action) {
      await signIn(result.action, { callbackUrl: '/tools' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center animate-fade-in leading-tight">
        Work Smarter, Not Harder
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 text-center max-w-xl mb-6 animate-slide-up">
        Use tools to simplify, optimize,
        and scale your workflow—effortlessly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form action={handleLogin}>
          <button
            type="submit"
            name="action"
            value="google"
            className="px-6 py-3 w-full sm:w-auto bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Get Started
          </button>
        </form>
        {/* <button
          onClick={() => window.location.href = "/tools"}
          className="px-6 py-3 w-full sm:w-auto bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
        >
          🚀 Get Started
        </button> */}
      </div>
    </div>
  );
};

export default Home;