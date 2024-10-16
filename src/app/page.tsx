import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteBlog from '@/components/DeleteBlog';
import CustomReactMarkdown from '@/components/CustomReactMarkdown';
import Navbar from '@/components/Navbar';
import { auth } from '@/auth';

const Home: React.FC = async () => {
  // Fetch logged-in user's session
  const session = await auth();

  // Get logged-in user details
    const loggedInUser = session && session.user && session.user.name && session.user.email && session.user.image
      ? { user: { name: session.user.name, email: session.user.email, image: session.user.image } }
      : null;
    
      // If there's a logged-in user, find or create them in the database
      if (loggedInUser) {
        await prisma.user.upsert({
          where: { email: loggedInUser.user.email },
          update: { name: loggedInUser.user.name, image: loggedInUser.user.image },
          create: {
            name: loggedInUser.user.name,
            email: loggedInUser.user.email,
            image: loggedInUser.user.image
          },
        });
      }
  
    

  // Check if the logged-in user is the editor (has special permissions)
  const isEditor = loggedInUser?.user.email === 'stevealila25@gmail.com';

  // Fetch blogs from the database
  const allBlogs = await prisma.blog.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <>
      <Navbar loggedInUser={loggedInUser} isEditor={isEditor} />
      <main>
        {allBlogs.map(blog => (
          <div key={blog.id} className="max-w-sm rounded overflow-hidden shadow-lg w-5/6 mx-auto flex flex-col items-center justify-center mb-8">
            <div className="px-6 py-4 w-[96%]">
              <div className="text-gray-700 text-base">
                <CustomReactMarkdown content={
                  blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content
                } />
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <Link href={`/blog/${blog.id}`}>#more</Link>
              </span>

              {/* Show update/delete links only if the user is the editor */}
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
    </>
  );
};

export default Home;
