import { auth } from "@/auth"
import { redirect } from "next/navigation"

const Tool: React.FC = async () => {
    const session = await auth()
    // If user is not logged in, redirect to the Google login page
    if (!session?.user) return redirect("/api/auth/signin?callbackUrl=/tools")

    return (
        <ul className='w-3/4 mx-auto my-8 flex justify-center align-center'>
            <li className='bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300'>
                <a href="/tools/yt">YouTube</a>
            </li>
        </ul>
    )
}

export default Tool
