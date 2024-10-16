import LoginForm from './LoginForm';
import Image from 'next/image';
import LogOutForm from './LogoutForm';
import Link from 'next/link';

interface LoggedInUser {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

interface NavbarProps {
  loggedInUser: LoggedInUser | null;
  isEditor: boolean; 
}

const Navbar = ({ loggedInUser, isEditor }: NavbarProps) => {
  return (
    <ul className="flex border-b py-1 justify-end items-center">
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
