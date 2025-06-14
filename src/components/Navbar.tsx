import Image from 'next/image'
import LogOutForm from './LogoutForm'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'

const Navbar = async ({ session }: { session: Session | null }) => {
  const loggedInUser = session?.user
  
  if (loggedInUser) {
    await prisma.user.upsert({
      where: { email: loggedInUser.email! },
      update: { name: loggedInUser.name!, image: loggedInUser.image! },
      create: {
        name: loggedInUser.name!,
        email: loggedInUser.email!,
        image: loggedInUser.image!
      },
    })
  }

  const isEditor = loggedInUser?.email === 'process.env.ADMIN_EMAIL'

  if (!loggedInUser) return ''

  return (
        <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-4 border-b p-3">
        <Link href='/tools' className='bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300'>Tools</Link>
        {/* <Link href='/blog' className='bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300'>Blog</Link> */}
          {isEditor && (
            <li className="mr-4">
              <Link href="/blog/create">
                <button className="bg-gray-200 rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                  Create Blog
                </button>
              </Link>
            </li>
          )}
          <li className="mr-1"><LogOutForm /></li>
          <Image 
            src={loggedInUser?.image as string}  
            alt={loggedInUser?.name as string} 
            height={32}
            width={32}
            className="rounded-full mr-4"
          />
    </ul>
  )
}

export default Navbar
