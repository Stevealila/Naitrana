import LoginForm from './LoginForm';
import Image from 'next/image';
import LogOutForm from './LogoutForm';
import Link from 'next/link';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';


const Navbar = async () => {

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

      const isEditor = loggedInUser?.user.email === 'stevealila25@gmail.com';

  return (
    <ul className="flex border-b py-1 justify-end items-center">
      <Link href='/'>Home</Link>
      {loggedInUser ? (
        <>
          {/* Show Create Blog link only if the user is an editor */}
          {isEditor && (
            <li className="mr-4">
              <Link href="/blog/create">
                <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                  Create Blog
                </button>
              </Link>
            </li>
          )}
          <li className="mr-1"><LogOutForm /></li>
          <Image 
            src={loggedInUser.user?.image as string}  
            alt={loggedInUser.user?.name as string} 
            height={32}
            width={32}
            className="rounded-full mr-4"
          />
        </>
      ) : (
        <li className="mr-1"><LoginForm /></li>
      )}
    </ul>
  );
};

export default Navbar;
