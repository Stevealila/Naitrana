"use server"

import { signOut } from "@/auth"

export const loginWithGoogle = async (formData: FormData) => {
    const action = formData.get('action') as string
    return { action }
}

export const loginOutOfGoogle = async () => await signOut({ redirectTo: '/' })