import { auth } from '@/auth'
import CreateUpdateBlogForm from '@/components/CreateUpdateBlogForm'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const session = await auth();
  const blog = await prisma.blog.findUnique({ where: { id: params.id } })

  if (!session?.user?.email) redirect('/blogs')
  if (!blog) return <div>Blog not found</div>

  return (
    <CreateUpdateBlogForm blog={blog} userEmail={session.user.email} />
  )
}

export default page