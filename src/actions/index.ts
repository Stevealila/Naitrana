"use server"

import { auth, signOut } from "@/auth"

export const loginWithGoogle = async (formData: FormData) => {
    const action = formData.get('action') as string
    return { action }
}

export const loginOutOfGoogle = async () => await signOut({ redirectTo: '/' })




// Blog


import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export const createBlog = async (formData: FormData) => {
  // grab logged-in user
  const session = await auth();
  if(!session?.user?.email) redirect('/');

  // Find the user by email to associate them as the author
  const userEmail = session.user.email;
  
  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Create the blog and link it to the user
  return prisma.blog.create({
    data: {
      content: formData.get('content') as string,
      author: {
        connect: { id: user.id }  // Associate the blog with the user
      }
    }
  });
};


export const updateBlog = async (id: string, formData: FormData, userEmail: string) => {
    // Find the blog and check the author
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { author: true }  // Get the author information
    });
  
    if (!blog) {
      throw new Error('Blog not found');
    }
  
    // Only allow the update if the logged-in user is the author or an admin
    if (blog.author.email !== userEmail && userEmail !== 'stevealila25@gmail.com') {
      throw new Error('You are not authorized to update this blog');
    }
  
    // Proceed with the update
    return prisma.blog.update({
      where: { id },
      data: {
        content: formData.get('content') as string,
      }
    });
  };
  
  

export const deleteBlog = async (id: string, userEmail: string) => {
    // Find the blog and check the author
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { author: true }  // Get the author information
    });
  
    if (!blog) {
      throw new Error('Blog not found');
    }
  
    // Only allow the deletion if the logged-in user is the author or an admin
    if (blog.author.email !== userEmail && userEmail !== 'stevealila25@gmail.com') {
      throw new Error('You are not authorized to delete this blog');
    }
  
    // Proceed with the deletion
    return prisma.blog.delete({
      where: { id }
    });
  };
  