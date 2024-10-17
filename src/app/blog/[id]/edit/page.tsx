import { updateBlog } from "@/actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from '@/auth'; 

const Update = async ({ params }: { params: { id: string } }) => {
  const session = await auth(); // Get the logged-in user

  const handleSubmit = async (formData: FormData) => {
    "use server";
    if (!session?.user?.email) {
      throw new Error("User is not logged in");
    }

    const success = await updateBlog(params.id, formData, session.user.email); // Pass user's email
    if (success) {
      revalidatePath('/');
      redirect('/');
    }
  };

  const blog = await prisma.blog.findUnique({ where: { id: params.id } });

  return (
    <form action={ handleSubmit }
      className="flex justify-center flex-col items-center">
      <textarea 
        name="content" 
        id="Create" 
        className="w-3/4 p-2 h-96 bg-gray-900 text-white mb-4" 
        defaultValue={blog?.content}
      ></textarea>
      <button 
        type="submit" 
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        Send
      </button>
    </form>
  );
};

export default Update;
