import CustomReactMarkdown from "@/components/CustomReactMarkdown"
import prisma from "@/lib/prisma"

const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '').replace(',', '');
}

const OneBlog = async ({ params }: { params: { id: string } }) => {
    const blog = await prisma.blog.findUnique({ where: { id: params.id } })

    if (!blog) {
        return <div>Blog not found</div>
    }

    return (
        <div className="rounded overflow-hidden shadow-lg w-5/6 mx-auto flex flex-col items-center justify-center mb-8">
            <div className="px-6 py-4 w-[96%]">
                <CustomReactMarkdown content={blog.content} />
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #published {formatDate(blog.createdAt)}
                </span>
            </div>
        </div>
    )
}

export default OneBlog