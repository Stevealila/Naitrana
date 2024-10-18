import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteBlog from '@/components/DeleteBlog';
import CustomReactMarkdown from '@/components/CustomReactMarkdown';
import { auth } from '@/auth';

const Home: React.FC = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  const isEditor = loggedInUser?.email === 'stevealila25@gmail.com';

  // Fetch blogs from the database
  const allBlogs = await prisma.blog.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <main>
      {allBlogs.length > 0 && allBlogs.map(blog => (
        <div key={blog.id} className="max-w-sm rounded overflow-hidden shadow-lg w-5/6 mx-auto flex flex-col items-center justify-center mb-8">
          <div className="px-6 py-4 w-[96%]">
            <div className="text-gray-700 text-base">
              <CustomReactMarkdown content={
                blog.content.length > 125 ? `${blog.content.slice(0, 125)}...` : blog.content
              } />
            </div>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <Link href={`/blog/${blog.id}`}>#more</Link>
            </span>

            {isEditor && (
              <>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <Link href={`/blog/${blog.id}/edit`}>#update</Link>
                </span>
                <DeleteBlog id={blog.id} />
              </>
            )}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Home;