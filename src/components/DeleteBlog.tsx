import { deleteBlog } from "@/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from '@/auth'; // Assuming you're using custom auth for session

const DeleteBlog = async ({ id }: { id: string }) => {
  const session = await auth(); // Retrieve the logged-in user's session

  const handleDelete = async () => {
    "use server";
    if (!session?.user?.email) {
      throw new Error("User is not logged in");
    }

    const success = await deleteBlog(id, session.user.email); // Pass the user's email for authorization
    if (success) {
      revalidatePath('/');
      redirect('/');
    }
  };

  return (
    <form action={ handleDelete } className="inline">
      <button 
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:cursor-pointer"
      >
        #delete
      </button>
    </form>
  );
};

export default DeleteBlog;
