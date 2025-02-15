// components/AuthWrapper.tsx
import { auth } from "@/auth"
import LoginForm from "@/components/LoginForm"

interface AuthWrapperProps {
    children: React.ReactNode
    callbackUrl: string
}

const AuthWrapper = async ({ children, callbackUrl }: AuthWrapperProps) => {
    const session = await auth()

    if (!session?.user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoginForm callbackUrl={callbackUrl} />
            </div>
        )
    }

    return children
}

export default AuthWrapper