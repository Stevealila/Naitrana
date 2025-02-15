import AuthWrapper from "@/components/AuthWrapper"

const Tool: React.FC = async () => {
    return (
        <AuthWrapper callbackUrl="/tools">
            <ul className='w-3/4 mx-auto my-8 flex justify-center align-center'>
                <li className='bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300'>
                    <a href="/tools/yt">YouTube</a>
                </li>
            </ul>
        </AuthWrapper>
    )
}

export default Tool
