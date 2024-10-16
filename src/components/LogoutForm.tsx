"use client"

import { loginOutOfGoogle } from "@/actions";

const LogOutForm = () => {
  return (
    <form action={loginOutOfGoogle}>
      <button type='submit'>Log Out</button>
    </form>
  )
}

export default LogOutForm