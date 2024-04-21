"use client";

import Image from "next/image";
import Toggle from "./Toggle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //Toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();
  //Delete post

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete("api/posts/deletePost", { data: id });
    },

    onError: (error) => {
      toast.error("Error deleting that post");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Error deleting that post🔥", { id: "logout" });
      queryClient.invalidateQueries({ queryKey: ["auth-posts"] });
    },
  });

  const deletePost = () => {
    mutation.mutate(id);
    deleteToastID = toast.loading("Creating your post", { id: "logout" });
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700 ml-2 mt-1">{name}</h3>
        </div>
        <div className="my-8">
          <h3 className="break-all">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            className="text-sm font-bold text-red-500"
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
