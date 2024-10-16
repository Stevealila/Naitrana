import LoginForm from './LoginForm'
import Image from 'next/image';
import LogOutForm from './LogoutForm';

const Navbar = async ({ loggedInUser }: { loggedInUser: any }) => {
  return (
    <ul className="flex border-b py-1 justify-end">
        { loggedInUser ? (
            <>
            <li className="mr-1"><LogOutForm /></li>
            <Image 
                src={ loggedInUser.user?.image as string }  
                alt={ loggedInUser.user?.name as string } 
                height={ 32 }
                width={ 32 }
                className='rounded-full mr-4'
            />
            </>
        ) : (
            <li className="mr-1"><LoginForm /></li>
        ) }
    </ul>
  )
}

export default Navbar