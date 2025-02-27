"use client"

import React from "react"
import { loginWithGoogle } from "@/actions"
import { signIn } from "next-auth/react"
import { useFormStatus } from "react-dom"

const Home = () => {
  const handleLogin = async (formData: FormData) => {
    const result = await loginWithGoogle(formData)
    if (result.action) {
      await signIn(result.action, { callbackUrl: "/tools" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center animate-fade-in leading-tight">
        Work Smarter, Not Harder
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 text-center max-w-xl mb-6 animate-slide-up">
        Use tools to simplify, optimize, and scale your workflow—effortlessly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form action={handleLogin}>
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      name="action"
      value="google"
      disabled={pending}
      className={`px-6 py-3 w-full sm:w-auto text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
        }`}
    >
      {pending ? "Processing..." : "🚀 Get Started"}
    </button>
  )
}

export default Home
