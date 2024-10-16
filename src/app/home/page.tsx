import { auth } from '@/auth'
import Navbar from '@/components/Navbar';

const Home = async () => {
  
  const loggedInUser = await auth();
  
  return (
    <Navbar loggedInUser={loggedInUser} />
  )
}

export default Home