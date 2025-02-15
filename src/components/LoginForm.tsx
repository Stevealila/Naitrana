// components/LoginForm.tsx
"use client"

import { loginWithGoogle } from "@/actions"
import { signIn } from "next-auth/react"

interface LoginFormProps {
  callbackUrl: string
}

const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const handleLogin = async (formData: FormData) => {
    const result = await loginWithGoogle(formData)
    if (result.action) {
      await signIn(result.action, { callbackUrl })
    }
  }

  return (
    <form action={handleLogin}>
      <button
        type='submit'
        name='action'
        value='google'
        className="px-6 py-3 w-full sm:w-auto bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
      >
        Continue with Google
      </button>
    </form>
  )
}

export default LoginForm