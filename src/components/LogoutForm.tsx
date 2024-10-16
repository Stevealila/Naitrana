"use client"

import { loginOutOfGoogle } from "@/actions";

const LogOutForm = () => {
  return (
    <form action={loginOutOfGoogle}>
      <button 
        type='submit'
        className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
      >
        Log Out
      </button>
    </form>
  )
}

export default LogOutForm