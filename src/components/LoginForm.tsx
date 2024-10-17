"use client"

import { loginWithGoogle } from "@/actions"
import { signIn } from "next-auth/react"

const LoginForm = () => {

  const handleLogin = async (formData: FormData) => {
    const result = await loginWithGoogle(formData)
    if (result.action) {
      await signIn(result.action, { callbackUrl: '/' })
    }
  }

  return (
    <form action={handleLogin}>
      <button type='submit' name='action' value='google'
      className="bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300"
      >Login</button>
    </form>
  )
}

export default LoginForm