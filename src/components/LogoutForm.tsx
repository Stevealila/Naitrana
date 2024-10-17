"use client"

import { loginOutOfGoogle } from "@/actions";

const LogOutForm = () => {
  return (
    <form action={loginOutOfGoogle}>
      <button 
        type='submit'
        className="bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300"
      >
        Log Out
      </button>
    </form>
  )
}

export default LogOutForm