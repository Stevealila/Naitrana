"use client"

import { loginWithGoogle } from "@/actions"
import { signIn } from "next-auth/react"

const LoginForm = () => {

  const handleLogin = async (formData: FormData) => {
    const result = await loginWithGoogle(formData)
    if (result.action) {
      await signIn(result.action, { callbackUrl: '/home' })
    }
  }

  return (
    <form action={handleLogin}>
      <button type='submit' name='action' value='google'>Login with Google</button>
    </form>
  )
}

export default LoginForm