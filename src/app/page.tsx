import { auth } from '@/auth'
import Navbar from '@/components/Navbar';

const Home = async () => {

  const session = await auth();

  const loggedInUser = session && session.user && session.user.name && session.user.email && session.user.image
  ? { user: { name: session.user.name, email: session.user.email, image: session.user.image } }
  : null;
  
  return (
    <Navbar loggedInUser={loggedInUser} />
  )
}

export default Home