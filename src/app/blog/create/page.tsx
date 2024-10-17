"use client"; 

import dynamic from "next/dynamic";
import { useState } from "react";
import { createBlog } from "@/actions"; 
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Create = () => {
  const [content, setContent] = useState<string>("**Write your blog here...**");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    formData.set("content", content || ""); 
    await createBlog(formData);
    router.push('/');
  };

  return (
    <form action={ handleSubmit } className="flex justify-center flex-col items-center">
      <MDEditor
        value={ content }
        onChange={ value => setContent(value || "") }  
        className="w-3/4 p-2 h-96 mb-4"
      />
      
      <input type="hidden" name="content" value={ content } /> 
      
      <button
        type="submit"
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        Send
      </button>
    </form>
  );
};

export default Create;