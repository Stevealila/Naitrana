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
      className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
      >Login with Google</button>
    </form>
  )
}

export default LoginForm