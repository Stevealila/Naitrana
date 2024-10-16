import { auth } from '@/auth'
import LogOutForm from '@/components/LogoutForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Home = async () => {
    const session = await auth();
    if(!session) redirect('/');
  return (
    <div>
        <h2 className="m-8">{ session.user?.name }</h2>
        <div className="p2 my-4">
            <Image 
                src={ session.user?.image as string }  
                alt={ session.user?.name as string } 
                height={ 72 }
                width={ 72 }
            />
            <LogOutForm />
        </div>
    </div>
  )
}

export default Home